export enum ActionTypes {
  AppearModal = "UI/AppearModal",
  RemoveModal = "UI/RemoveModal"
}

export enum ModalTypes {
  // null使用のクラッシュが怖いので開いてないときはNotOpenを入れる
  NotOpen,
  // ログ表示用のモーダル
  LogDisplay,
  // 最初に表示するモーダル
  FirstDisplay,
  // 以下、リソース作成モーダルのタイプ
  MetadataForm,
  EC2Form,
  VPCForm,
  SubnetForm,
  RouteTableForm,
  SecurityGroupForm,
  InternetGatewayForm
}
