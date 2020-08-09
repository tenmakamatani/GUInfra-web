export const TYPES = {
  // Repository
  EC2Repository: Symbol.for("EC2Repository"),
  VPCRepository: Symbol.for("VPCRepository"),
  SubnetRepository: Symbol.for("SubnetRepository"),
  RouteTableRepository: Symbol.for("RouteTableRepository"),
  SecurityGroupRepository: Symbol.for("SecurityGroupRepository"),
  InternetGatewayRepository: Symbol.for("InternetGatewayRepository"),
  // UseCase
  AWSResourceUseCase: Symbol.for("AWSResourceUseCase")
} as const;
