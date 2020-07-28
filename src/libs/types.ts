export const TYPES = {
  EC2Repository: Symbol.for("EC2Repository"),
  VPCRepository: Symbol.for("VPCRepository"),
  SecurityGroupRepository: Symbol.for("SecurityGroupRepository"),
  AWSResourceUseCase: Symbol.for("AWSResourceUseCase")
} as const;
