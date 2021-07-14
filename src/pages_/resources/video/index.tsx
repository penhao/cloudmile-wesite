import React, { useEffect, useState } from 'react';
import Layout from "../../../components/Layout";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core";
import VideoListBanner from "../../../components/sections/video/VideoListBanner";
import VideoList from "../../../components/sections/video/VideoList";
import {
    fetchVideoCategoryList,
    fetchVideoList
} from "../../../services/ApiServices";
import { GetServerSidePropsContext } from "next";
import VideoFilterList from "../../../components/sections/video/VideoFilterList";
import useTranslation from "next-translate/useTranslation";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import { VideoContextStore } from '../../../@share/context/VideoContext';
import RegisterModal from "../../../components/sections/video/RegisterModal";
import { useRouter } from 'next/router';
import { getMetadada } from '../../../@share/routes/Metadata';
import { getBreadcrumb } from '../../../@share/routes/Routes';
import Container from '../../../components/containers/Container';
import Breadcrumbs from "../../../components/Breadcrumb";

const useStyles = makeStyles((theme: Theme) => ({
    bannerContainer: {
        position: 'relative',
        width: '100%'
    },
    categoryContainer: {
        position: 'absolute',
        width: '100%',
        top: 0
    },
    listContainer: {
        marginTop: '-80px'
    }
}));

// Modal.setAppElement("#__next");
const Video = ({ fetchCategory, fetchCategoryId, fetchPost }) => {
    const classes = useStyles();
    const { t, lang } = useTranslation();
    const router = useRouter();
    const metadata = getMetadada(router.route);
    const [breadcrumbData, setBreadcrumbData] = useState([]);

    const smUp = useMediaQuery(useTheme().breakpoints.up('sm'));
    const [categoryId, setCategoryId] = useState(5);
    const [currentCategory, setCurrentCategory] = useState({ image_pc: '', image_mobile: '', youtube_link: '' });
    const [categoryData, setCategoryData] = useState([]);
    const [postData, setPostData] = useState<any[]>([]);
    const [registerData, setRegisterData] = useState({});
    const [startCount, setStartCount] = useState(1);
    const [disabledMore, setDisabledMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handlerCategoryClick = async (id: number) => {
        setCategoryId(id);
        setCurrentCategory(categoryData.find((category: any) => {
            return Number(category.id) === id;
        }));
        const response = await getPostData(id, 1);
        if (response.status) {
            setPostData(response.data);
            setStartCount(response.data.length);
            setDisabledMore(response.total <= response.data.length);
            setRegisterData(fetchPost.data.find((post) => {
                return +post.id === +router.query.postId
            }));
        }
    };
    const handleMoreClick = async (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsLoading(true);
        const response = await getPostData(categoryId, startCount + 1);
        if (response.status) {
            const listTotal = postData.length + response.data.length;
            setPostData([...postData, ...response.data]);
            setStartCount(listTotal);
            setDisabledMore(response.total <= listTotal);
        }
        setIsLoading(false);
    };
    const getPostData = (id: number, startCount: number) => {
        return fetchVideoList(lang, startCount, 8, id);
    };
    useEffect(() => {
        //
        let breadcrumbs = getBreadcrumb(router.route);
        breadcrumbs = breadcrumbs.map((breadcrumb) => {
            return {
                ...breadcrumb,
                breadcrumbName: t(`common:${breadcrumb.breadcrumbName}`),
            };
        })
        setBreadcrumbData(breadcrumbs)
        //
        if (fetchCategory.status) {
            setCategoryId(fetchCategoryId);
            setCategoryData(fetchCategory.data);
            const currentCategoryData = fetchCategory.data.find((category: any) => {
                return Number(category.id) === Number(fetchCategoryId);
            });
            if (currentCategoryData !== undefined) {
                setCurrentCategory(currentCategoryData);
            } else {
                setCurrentCategory({ image_pc: '', image_mobile: '', youtube_link: '' });
            }
        }
        if (fetchPost.status) {
            setPostData(fetchPost.data);
            setStartCount(fetchPost.data.length);
            setDisabledMore(fetchPost.total <= fetchPost.data.length);
        }
        if (router.query.postId) {
            setRegisterData(fetchPost.data.find((post) => {
                return +post.id === +router.query.postId
            }));
        }
    }, [lang]);

    useEffect(() => {
        if (router.query.postId) {
            setRegisterData(postData.find((post) => {
                return +post.id === +router.query.postId
            }));
        }
    }, [router])

    return (
        <Layout
            metadata={{
                href: metadata.href,
                title: metadata[lang].title,
                desc: metadata[lang].desc,
            }}
            bgColor={'darken'}
        >
            <RegisterModal isOpen={!!router.query.postId} postData={registerData} />
            <div className={classes.bannerContainer}>
                <VideoListBanner imgUrl={smUp ? currentCategory.image_pc : currentCategory.image_mobile}
                    videoId={currentCategory.youtube_link} />
                <div className={classes.categoryContainer}>
                    <Container maxWidth={{ md: 1280 }}>
                        <Breadcrumbs breadcrumbData={breadcrumbData} color={"white"} />
                    </Container>
                    <VideoFilterList parentPage={'video'}
                        activeId={categoryId}
                        categoryData={categoryData}
                        clickHandler={handlerCategoryClick} />
                </div>
            </div>
            <div className={classes.listContainer}>
                <VideoList postData={postData}
                    categoryId={categoryId}
                    isLoading={isLoading}
                    disabledMore={disabledMore}
                    moreHandler={handleMoreClick} />
            </div>
        </Layout>
    );
};

export const getServerSideProps = async ({ locale, query }: GetServerSidePropsContext) => {
    const fetchCategory = await fetchVideoCategoryList(locale);
    let categoryId = -1;
    if (fetchCategory.status && fetchCategory.data.length) {
        const currentCategory = fetchCategory.data.find((category: any) => {
            return Number(category.id) === Number(query.category);
        });
        if (query.hasOwnProperty('category')) {
            categoryId = (currentCategory === undefined) ? Number(fetchCategory.data[0].id) : Number(query.category);
        } else {
            categoryId = Number(fetchCategory.data[0].id);
        }
    }
    const fetchPost = await fetchVideoList(locale, 1, 12, categoryId);
    return {
        props: {
            fetchCategory,
            fetchPost,
            fetchCategoryId: categoryId
        }
    }
};
export default Video;
