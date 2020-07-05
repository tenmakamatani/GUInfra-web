export enum ActionTypes {
  AppearModal = "UI/AppearModal",
  RemoveModal = "UI/RemoveModal"
}

export enum ModalTypes {
  // null使用のクラッシュが怖いので開いてないときはNotOpenを入れる
  NotOpen,
  // 以下、モーダルのタイプ
  MetadataForm,
  VPCForm
}
