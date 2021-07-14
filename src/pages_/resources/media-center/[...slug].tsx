import React, { useEffect, useRef, useState } from 'react';
import Layout from "../../../components/Layout";
import { GetServerSidePropsContext } from "next";
import useTranslation from "next-translate/useTranslation";
import ScrollProgress from "../../../components/sections/resources/ScrollProgress";
import BlogDetailBanner from "../../../components/blog-detail/BlogDetailBanner";
import BlogDetailHead from "../../../components/blog-detail/BlogDetailHead";
import Download from "../../../components/sections/Download";
import RelatedPost from "../../../components/sections/resources/RelatedPost";
import NewsLetter from "../../../components/sections/NewsLetter";
import BlogDetailArticle from "../../../components/blog/BlogDetailArticle";
import IdleNewsletterModal from "../../../components/modal/IdleNewsletterModal";
import { fetchMediaCenterArticle } from "../../../services/ApiServices";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import { isValueEmpty } from "../../../utils/Utils";
import { SalesforcePostParams } from "../../../components/useUrlParams";
import { useRouter } from "next/router";
import { getMetadada } from '../../../@share/routes/Metadata';
import { getBreadcrumb } from '../../../@share/routes/Routes';
import Container from '../../../components/containers/Container';
import Breadcrumbs from "../../../components/Breadcrumb";

const MediaCenterDetail = ({ postData }) => {

    const { t } = useTranslation();
    const router = useRouter();
    const smUp = useMediaQuery(useTheme().breakpoints.up('sm'));
    const contactRef = useRef<HTMLDivElement>(null);
    const [salesforceData, setSalesforceData] = useState<SalesforcePostParams | null>(null);
    const metadata = getMetadada("/resources/media-center");
    const [breadcrumbData, setBreadcrumbData] = useState([]);

    console.log(postData);

    const handleScroll = () => {
        window.scrollTo({ behavior: "smooth", top: contactRef.current.offsetTop });
    };
    useEffect(() => {
        //
        let breadcrumbs = getBreadcrumb("/resources/media-center");
        breadcrumbs = breadcrumbs.map((breadcrumb) => {
            return {
                ...breadcrumb,
                breadcrumbName: t(`common:${breadcrumb.breadcrumbName}`),
            };
        })
        breadcrumbs.push({
            path: router.asPath,
            breadcrumbName: postData.title
        })
        setBreadcrumbData(breadcrumbs)
        //
        setSalesforceData({
            utmSource: postData.utm_source,
            utmMedium: postData.utm_medium,
            utmCampaign: postData.utm_campaign,
            leadSource: postData.lead_source,
            campaignId: postData.salesforce_id,
            redirectUrl: postData.download_url
        });
    }, [postData]);

    return (
        <Layout metadata={{
            href: "/resources/blog",
            title: postData.seo_title,
            desc: postData.seo_description,
            keywords: postData.seo_keyword,
            shareImage: postData.image_social,
            customBreadcrumbNode: {
                breadcrumbName: postData.title,
                path: router.asPath
            }
        }}>
            <ScrollProgress />
            <BlogDetailBanner imgUrl={smUp ? postData.image_pc : postData.image_mobile} />
            <Container maxWidth={{ md: 1280 }}>
                <Breadcrumbs breadcrumbData={breadcrumbData} />
            </Container>
            <BlogDetailHead title={postData.title}
                date={postData.start_date}
                tagData={postData.tags}
                parentPage={'media-center'} />
            <BlogDetailArticle contents={postData.content} scrollHandler={handleScroll} />
            {
                (!isValueEmpty(postData.download_title))
                    ?
                    <Download parentPage={'media-center'}
                        title={postData.download_title}
                        salesforceData={salesforceData} />
                    :
                    null
            }
            <RelatedPost parentPage={'media-center'}
                postData={postData.related_article}
                title={t('media-center:Related Articles').toUpperCase()} />
            <div ref={contactRef}>
                <NewsLetter
                    title={t('media-center:Want To Know More About Our Exclusive Offers, Global Digital Trends, and More?')}
                    caption={t('media-center:Join the CloudMile Newsletter')}
                    salesforceData={salesforceData} />
            </div>
            <IdleNewsletterModal
                title={t('media-center:Want To Know More About Our Exclusive Offers, Global Digital Trends, and More?')}
                caption={t('media-center:Sign Up For Newsletter')}
                salesforceData={salesforceData} />
        </Layout>

    );
};

export const getServerSideProps = async ({ locale, query, res }: GetServerSidePropsContext) => {
    const postData = await fetchMediaCenterArticle(locale, query.slug[0]);
    if (postData?.error || postData?.error === 'article not found') {
        const redirectUrl = `${(locale === 'zh') ? '/zh' : ''}/404`;
        res.setHeader("location", redirectUrl);
        res.statusCode = 302;
        res.end();
    }
    return {
        props: {
            postData: postData.data[0]
        }
    }
};
export default MediaCenterDetail;
