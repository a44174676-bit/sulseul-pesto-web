/** 연락처는 이 파일에서만 변경합니다. 정식 공개 전 창업자 승인이 필요합니다. */
export const site = {
  name: "슬슬페스토",
  englishName: "SULSEUL PESTO",
  founder: "김태완",
  phone: "010-7158-9345",
  phoneHref: "tel:+821071589345",
  email: "taechef0927@naver.com",
  inquiry: { mode: "email" as const, subject: "[슬슬페스토] 협력 문의" },
};
export const emailHref = `mailto:${site.email}`;
export const inquiryHref = `${emailHref}?subject=${encodeURIComponent(site.inquiry.subject)}`;
