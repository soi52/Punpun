export interface KakaoUserInfo {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image: string;
    thumbnail_image: string;
  };
  kakao_account: {
    profile_needs_agreement: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url: string;
      profile_image_url: string;
      is_default_image: boolean;
    };
    email_needs_agreement: boolean;
    has_email: boolean;
    email: string;
    is_email_valid: boolean;
    is_email_verified: boolean;
    has_age_range: boolean;
    age_range_needs_agreement: boolean;
    age_range: string;
    birthday_needs_agreement: boolean;
    birthday: string;
    gender_needs_agreement: boolean;
    gender: string;
  };
}

export interface MenuSupport {
  supportId: null | number;
  supportType: string;
  supportDate: string;
  menuId: number;
  menuName: string;
  totalCount: number;
  useCount: number;
}

export interface Reviews {
  id: number;
  userImage: string;
  userName: string;
  reviewText: string;
}

export interface Store {
  storeId: number;
  storeName: string;
  storeOpenTime: string | null;
  storeInfo: string | null;
  storeAddress: string;
  storeLon: number;
  storeLat: number;
  storeImageName: string | null;
  storeImage: string | null;
  storePhoneNumber: string | null;
  storeAlwaysShare: Boolean;
  storeSupport: boolean;
  menuDTO: MenuDTO[];
}

export type MenuDTO = {
  menuId: number;
  menuName: string;
  menuPrice: number;
  menuCount: number;
  menuImage: string;
  menuImageName: string;
};

export interface OwStoreUpdate {
  storeId: number;
  storeName: string;
  storeOpenTime: string | null;
  storeInfo: string | null;
  storeAddress: string;
  storePhoneNumber: string | null;
  storeAlwaysShare: Boolean;
}

export interface UserInfo {
  userId: number;
  userName: string;
  userEmail: string;
  userRole: string;
  userNumber: string;
  userSupportedPoint: number | null;
  userRemainPoint: number | null;
  userArea: string | null;
  userProfileName: string | null;
  userProfileImage: string | null;
}
