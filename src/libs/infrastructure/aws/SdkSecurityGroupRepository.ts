import * as AWS from "aws-sdk";
import { injectable } from "inversify";

import { SecurityGroup } from "../../domain/models/aws";
import { IAWSState } from "../../domain/state/aws";
import { SecurityGroupRepository } from "../../domain/repositories/aws";
import { ResourceIdsDatastore } from "../../application/datastore/ResourceIdsDatastore";

@injectable()
export class SdkSecurityGroupRepository extends SecurityGroupRepository {
  private _ec2: AWS.EC2;

  constructor(metadata: IAWSState["metadata"]) {
    super();
    this._ec2 = new AWS.EC2(metadata);
  }

  async create(securityGroup: SecurityGroup): Promise<string> {
    const group = await this._ec2
      .createSecurityGroup({
        GroupName: securityGroup.properties.name,
        Description: securityGroup.properties.description
      })
      .promise();
    const groupId = group.GroupId!;
    await Promise.all([
      this._ec2.authorizeSecurityGroupIngress({
        GroupId: groupId,
        IpPermissions: securityGroup.properties.permissions.ingress.map(p => ({
          IpProtocol: p.protocol,
          FromPort: p.fromPort,
          ToPort: p.toPort,
          IpRanges: p.ipRanges.map(range => ({
            CidrIp: range
          }))
        }))
      }),
      this._ec2.authorizeSecurityGroupEgress({
        GroupId: groupId,
        IpPermissions: securityGroup.properties.permissions.egress.map(p => ({
          IpProtocol: p.protocol,
          FromPort: p.fromPort,
          ToPort: p.toPort,
          IpRanges: p.ipRanges.map(range => ({
            CidrIp: range
          }))
        }))
      })
    ]);
    ResourceIdsDatastore.securityGroupIds.push(groupId);
    return groupId;
  }

  async deleteAll(): Promise<void> {
    const deleteAllSecurityGroupPromise = ResourceIdsDatastore.securityGroupIds.map(
      s =>
        this._ec2
          .deleteSecurityGroup({
            GroupId: s
          })
          .promise()
    );
    await Promise.all(deleteAllSecurityGroupPromise);
  }
}
