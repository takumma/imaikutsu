import Head from "next/head";

export type SeoProps = {
  title?: string;
  imgUrl?: string;
  url?: string;
  description?: string;
};

const Seo = ({ title, imgUrl, url, description }: SeoProps) => {
  const defaultTitle = "imaikutsu?";
  const defaultImgUrl =
    "https://res.cloudinary.com/dykntmxnh/image/upload/v1642257415/imaikutsu.png";
  const defaultUrl = "https://imaikutsu.takumma.net/";
  const defaultDescription =
    "imaikutsu? は Twitter で毎日の体調を記録するサービスです。ユーザー名の後ろに付けた数字を、毎日記録してくれます。";
  const siteName = "imaikutsu?";

  const pageTitle = title ? `${title} / ${defaultTitle}` : defaultTitle;
  const ogImage = imgUrl ? imgUrl : defaultImgUrl;
  const siteUrl = url ? url : defaultUrl;
  const pageDescription = description ? description : defaultDescription;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={siteUrl} />
    </Head>
  );
};

export default Seo;
