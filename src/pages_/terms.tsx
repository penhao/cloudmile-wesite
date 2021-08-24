import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getMetadada } from "../@share/routes/Metadata";
import { useTranslation } from "next-translate";
import { Theme, makeStyles } from "@material-ui/core";
import { getBreadcrumb } from "../@share/routes/Routes";
import Breadcrumbs from "../components/Breadcrumb";
import Container from "../components/containers/Container";
import SectionContainer from "../components/containers/SectionContainer";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) => ({
    article: {
        // paddingTop: '20px',
        "& > h6": {
            marginBottom: "20px",
        },
        "& > p": {
            marginBottom: "40px",
        },
        "& ol, ul": {
            listStylePosition: "outside",
            margin: 0,
            paddingLeft: "20px",

            "& > li": {
                listStyleType: "upper-roman",
                fontSize: theme.typography.pxToRem(18),
                lineHeight: 1.5,
                marginBottom: "40px",
                [theme.breakpoints.up("md")]: {
                    fontSize: theme.typography.pxToRem(20),
                },
                "& p": {
                    fontSize: theme.typography.pxToRem(14),
                    lineHeight: 1.63,
                    marginBottom: "20px",
                    [theme.breakpoints.up("md")]: {
                        fontSize: theme.typography.pxToRem(16),
                    },
                },
                "& ol": {
                    marginBottom: "20px",
                    "& > li": {
                        listStyleType: "decimal",
                        fontSize: theme.typography.pxToRem(14),
                        lineHeight: 1.63,
                        marginBottom: "10px",
                        [theme.breakpoints.up("md")]: {
                            fontSize: theme.typography.pxToRem(16),
                        },
                    },
                },
                "& ul": {
                    marginBottom: "20px",
                    "& > li": {
                        listStyleType: "disc",
                        fontSize: theme.typography.pxToRem(14),
                        lineHeight: 1.63,
                        marginBottom: "10px",
                        [theme.breakpoints.up("md")]: {
                            fontSize: theme.typography.pxToRem(16),
                        },
                    },
                },
                "& div": {
                    marginTop: "20px",
                },
                "& a": {
                    fontSize: theme.typography.pxToRem(14),
                    lineHeight: 1.63,
                    color: theme.palette.secondary.main,
                    textDecoration: "underline",
                    [theme.breakpoints.up("md")]: {
                        fontSize: theme.typography.pxToRem(16),
                    },
                },
            },
        },
    },
    title: {
        display: "inline-block",
        position: "relative",
        fontSize: "2.75rem",
        fontWeight: 700,
        lineHeight: 0.8,
        margin: "20px 0 40px 0",
        left: "50%",
        transform: "translateX(-50%)",
        [theme.breakpoints.up("sm")]: {
            margin: "20px 0 60px 0",
        },
        [theme.breakpoints.up("md")]: {
            fontSize: theme.typography.pxToRem(90),
            margin: "50px 0 90px 0",
        },
        "& span": {
            display: "block",
            position: "relative",
            marginTop: "10px",
            fontWeight: "normal",
            [theme.breakpoints.up("sm")]: {
                marginTop: "20px",
            },
        },
    },
}));
const PolicyTerms = () => {
    const classes = useStyles();
    const { t, lang } = useTranslation();
    const metadata = getMetadada("/terms");
    const [breadcrumbData, setBreadcrumbData] = useState([]);
    useEffect(() => {
        //
        let breadcrumbs = getBreadcrumb("/terms");
        breadcrumbs = breadcrumbs.map((breadcrumb) => {
            return {
                ...breadcrumb,
                breadcrumbName: t(`common:${breadcrumb.breadcrumbName}`),
            };
        });
        setBreadcrumbData(breadcrumbs);
    }, [lang]);

    return (
        <Layout
            metadata={{
                href: metadata.href,
                title: metadata[lang].title,
                desc: metadata[lang].desc,
            }}
        >
            <Container>
                <Breadcrumbs breadcrumbData={breadcrumbData} />
            </Container>
            <SectionContainer>
                <Container maxWidth={{ sm: 920, md: 920 }} className={classes.article}>
                    <Typography variant={"h1"} className={classes.title}>
                        {t("terms:Terms")}
                        <br />
                        <Typography variant={"body1"} component={"span"}>
                            {t("terms:version")}
                        </Typography>
                    </Typography>
                    <ol>
                        <li>
                            {t("terms:list1.title")}
                            <div>
                                <Typography
                                    variant={"body1"}
                                    dangerouslySetInnerHTML={{
                                        __html: t("terms:list1.desc"),
                                    }}
                                />
                            </div>
                        </li>
                        <li>
                            {t("terms:list2.title")}
                            <div>
                                <Typography
                                    variant={"body1"}
                                    dangerouslySetInnerHTML={{
                                        __html: t("terms:list2.desc"),
                                    }}
                                />
                            </div>
                        </li>
                        <li>
                            {t("terms:list3.title")}
                            <div>
                                <Typography
                                    variant={"body1"}
                                    dangerouslySetInnerHTML={{
                                        __html: t("terms:list3.desc"),
                                    }}
                                />
                            </div>
                        </li>
                        <li>
                            {t("terms:list4.title")}
                            <div>
                                {lang === "zh" && (
                                    <Typography
                                        variant={"body1"}
                                        dangerouslySetInnerHTML={{
                                            __html: t("terms:list4.desc"),
                                        }}
                                    />
                                )}
                                <ul>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list4.sublist1")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list4.sublist2")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list4.sublist3")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list4.sublist4")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list4.sublist5")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list4.sublist6")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list4.sublist7")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list4.sublist8")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list4.sublist9")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list4.sublist10")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list4.sublist11")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list4.sublist12")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list4.sublist13")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list4.sublist14")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list4.sublist15")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list4.sublist16")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list4.sublist17")}</Typography>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            {t("terms:list5.title")}
                            <div>
                                <Typography
                                    variant={"body1"}
                                    dangerouslySetInnerHTML={{
                                        __html: t("terms:list5.desc"),
                                    }}
                                />
                            </div>
                        </li>
                        <li>
                            {t("terms:list6.title")}
                            <div>
                                <Typography
                                    variant={"body1"}
                                    dangerouslySetInnerHTML={{
                                        __html: t("terms:list6.desc"),
                                    }}
                                />
                            </div>
                        </li>
                        <li>
                            {t("terms:list7.title")}
                            <div>
                                <ul>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list7.sublist1")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list7.sublist2")}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant={"body1"}>{t("terms:list7.sublist3")}</Typography>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ol>
                </Container>
            </SectionContainer>
        </Layout>
    );
};
export default PolicyTerms;
