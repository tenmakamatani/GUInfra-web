import * as AWS from "aws-sdk";
import { injectable } from "inversify";

import { SecurityGroup, SecurityGroupId } from "../../domain/models/aws";
import { IAWSState } from "../../domain/state/aws";
import { SecurityGroupRepository } from "../../domain/repositories/aws";
import { ResourceIdsDatastore } from "../../application/datastore";

@injectable()
export class SdkSecurityGroupRepository extends SecurityGroupRepository {
  private _ec2: AWS.EC2;

  constructor(metadata: IAWSState["metadata"]) {
    super();
    this._ec2 = new AWS.EC2(metadata);
  }

  async create(securityGroup: SecurityGroup): Promise<void> {
    const vpcId = ResourceIdsDatastore.getVpcResourceId(
      securityGroup.properties.vpcId
    );
    const group = await this._ec2
      .createSecurityGroup({
        VpcId: vpcId,
        GroupName: securityGroup.properties.name,
        Description: securityGroup.properties.description
      })
      .promise();
    const groupId = group.GroupId!;
    await Promise.all([
      this._ec2
        .authorizeSecurityGroupIngress({
          GroupId: groupId,
          IpPermissions: securityGroup.properties.permissions.ingress.map(p => {
            const port =
              p.type === "ssh"
                ? 22
                : p.type === "http"
                ? 80
                : p.type === "https"
                ? 443
                : 0;
            return {
              IpProtocol: "tcp",
              FromPort: port,
              ToPort: port,
              IpRanges: [
                {
                  CidrIp: "0.0.0.0/0"
                }
              ]
            };
          })
        })
        .promise(),
      this._ec2
        .authorizeSecurityGroupEgress({
          GroupId: groupId,
          IpPermissions: securityGroup.properties.permissions.egress.map(p => {
            const port =
              p.type === "ssh"
                ? 22
                : p.type === "http"
                ? 80
                : p.type === "https"
                ? 443
                : 0;
            return {
              IpProtocol: "tcp",
              FromPort: port,
              ToPort: port,
              IpRanges: [
                {
                  CidrIp: "0.0.0.0/0"
                }
              ]
            };
          })
        })
        .promise()
    ]);
    ResourceIdsDatastore.setSecurityGroupId({
      entityId: securityGroup.id,
      resourceId: groupId
    });
  }

  async delete(securityGroupEntityId: SecurityGroupId): Promise<void> {
    const securityGroupResourceId = ResourceIdsDatastore.getSecurityGroupResourceId(
      securityGroupEntityId
    );
    await this._ec2
      .deleteSecurityGroup({
        GroupId: securityGroupResourceId
      })
      .promise();
  }
}
