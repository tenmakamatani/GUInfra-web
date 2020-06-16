import { VPC } from "@libs/domain/models/aws";
import { IAWSState as DomainAWSState } from "@libs/domain/state/aws";

import { withBaseUI } from "../ UIType";

export interface IAWSState {
  metadata: DomainAWSState["metadata"];
  vpcList: withBaseUI<VPC>[];
}
