export type UserDetails = {
  google_id: string;
  email: string;
  name: string;
  picture: string;
};

export type CreateChildrenDetails = {
  name: string;
  year: string;
  month: string;
  content_settings: string;
  picture: string;
};

export type CreateVideoForChildrenDetails = {
  videoId: string;
  thumbnail: string;
  title: string;
  type: string;
};

export type CreateVideoHistoryDetails = {
  videoId: string;
  thumbnail: string;
  title: string;
};

export type ModifyChildrenForChildrenDetails = {
  name: string;
  picture: string;
};

export type ModifyChildrenForParentDetails = {
  name: string;
  picture: string;
  year: string;
  month: string;
};

export type UpdateMessageChatDetails = {
  name: string;
  picture: string;
  text: string;
};

export type UpdateKidActivityDetails = {
  name: string;
  picture: string;
  type: string;
  activity: UpdateActivityDetails;
};

type UpdateActivityDetails = {
  content: string;
  videoId: string;
  channelId: string;
  new_name: string;
  new_picture: string;
};

export type CreateSubscriptionDetails = {
  channelId: string;
  title: string;
  picture: string;
};
