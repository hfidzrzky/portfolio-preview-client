export type SocialType = "whatsapp" | "instagram" | "email";

export interface SocialLinkData {
    name: string;
    url: string;
    type: SocialType;
}
