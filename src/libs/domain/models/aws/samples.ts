import { EC2, VPC, Subnet, RouteTable, SecurityGroup, InternetGateway, AvailabilityZone } from ".";

const vpc = new VPC({
  properties: {
    name: "vpc-sample",
    cidrBlock: "10.0.0.0/16"
  }
});
const subnet = new Subnet({
  properties: {
    name: "subnet-sample",
    availabilityZone: AvailabilityZone[0],
    cidrBlock: "10.0.0.1/17",
    vpcId: vpc.id
  }
});
const internetGateway = new InternetGateway({
  properties: {
    name: "gateway-sample",
    vpcId: vpc.id
  }
});
const securityGroup = new SecurityGroup({
  properties: {
    name: "sample-name",
    description: "sample-description",
    permissions: {
      ingress: [{ type: "all" }],
      egress: [{ type: "all" }]
    },
    vpcId: vpc.id
  }
});
const ec2 = new EC2({
  properties: {
    subnetId: subnet.id,
    name: "ec2-sample",
    securityGroupIds: [securityGroup.id]
  }
});
const routeTable = new RouteTable({
  properties: {
    vpcId: vpc.id,
    subnetId: subnet.id,
    gatewayId: internetGateway.id
  }
});

export default {
  ec2,
  vpc,
  subnet,
  routeTable,
  securityGroup,
  internetGateway
};
