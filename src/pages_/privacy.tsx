import React, { Fragment, useEffect, useState } from "react";
import Layout from "../components/Layout";
import useTranslation from "next-translate/useTranslation";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core";
import SectionContainer from "../components/containers/SectionContainer";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import { getMetadada } from "../@share/routes/Metadata";
import Container from "../components/containers/Container";
import { getBreadcrumb } from "../@share/routes/Routes";
import Breadcrumbs from "../components/Breadcrumb";

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
                "& ol,ul": {
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
                "& div": {
                    marginTop: "20px",
                },
            },
        },
        "& a": {
            fontSize: theme.typography.pxToRem(14),
            lineHeight: 1.63,
            color: theme.palette.secondary.main,
            textDecoration: "underline",
            [theme.breakpoints.up("md")]: {
                display: "inline",
                fontSize: theme.typography.pxToRem(16),
                lineBreak: "anywhere",
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
            textAlign: "left",
            textIndent: "5px",
            [theme.breakpoints.up("sm")]: {
                marginTop: "20px",
            },
        },
    },
}));
const PrivacyPage = () => {
    const { t, lang } = useTranslation();
    const classes = useStyles();
    const router = useRouter();
    const metadata = getMetadada(router.route);
    const [breadcrumbData, setBreadcrumbData] = useState([]);
    useEffect(() => {
        //
        let breadcrumbs = getBreadcrumb(router.route);
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
                    <Typography variant={"h1"} align={"center"} className={classes.title}>
                        {t("privacy:PRIVACY POLICY")}
                        <br />
                        <Typography variant={"body1"} component={"span"}>
                            {t("privacy:version")}
                        </Typography>
                    </Typography>
                    <Typography
                        variant={"body1"}
                        dangerouslySetInnerHTML={{
                            __html: t("privacy:This Privacy Policy was last updated on March 16__"),
                        }}
                    />
                    <ol>
                        <li>
                            {t("privacy:Personal Data")}
                            <div>
                                <Typography
                                    variant={"body1"}
                                    dangerouslySetInnerHTML={{
                                        __html: t("privacy:Personal Data is information about you that is__"),
                                    }}
                                />
                            </div>
                        </li>
                        <li>
                            {t("privacy:Non-Personal Data")}
                            <div>
                                <Typography
                                    variant={"body1"}
                                    dangerouslySetInnerHTML={{
                                        __html: t("privacy:We may collect non-personally identifiable data about__"),
                                    }}
                                />
                            </div>
                        </li>

                        <li>
                            {t("privacy:Web Browser Cookies")}
                            <div>
                                <Typography
                                    variant={"body1"}
                                    dangerouslySetInnerHTML={{
                                        __html: t("privacy:Certain information may also be collected__"),
                                    }}
                                />
                            </div>
                        </li>

                        <li>
                            {t("privacy:How We Process and Use Collected Personal Data")}
                            <div>
                                <Typography
                                    variant={"body1"}
                                    dangerouslySetInnerHTML={{ __html: t("privacy:Cloudmile may process and use__") }}
                                />
                                <ol>
                                    <li>
                                        <Typography
                                            variant={"body1"}
                                            dangerouslySetInnerHTML={{ __html: t("privacy:period") }}
                                        />
                                    </li>
                                    <li>
                                        <Typography
                                            variant={"body1"}
                                            dangerouslySetInnerHTML={{ __html: t("privacy:region") }}
                                        />
                                    </li>
                                    <li>
                                        <Typography
                                            variant={"body1"}
                                            dangerouslySetInnerHTML={{ __html: t("privacy:target") }}
                                        />
                                    </li>
                                    <li>
                                        <Typography
                                            variant={"body1"}
                                            dangerouslySetInnerHTML={{ __html: t("privacy:To Communicate with Users") }}
                                        />
                                        <Typography
                                            variant={"body1"}
                                            dangerouslySetInnerHTML={{
                                                __html: t("privacy:In the event that Users send to us__"),
                                            }}
                                        />
                                    </li>
                                    <li>
                                        <Typography
                                            variant={"body1"}
                                            dangerouslySetInnerHTML={{
                                                __html: t("privacy:To personalize user experience"),
                                            }}
                                        />
                                        <Typography
                                            variant={"body1"}
                                            dangerouslySetInnerHTML={{
                                                __html: t("privacy:We may use information in the aggregate to__"),
                                            }}
                                        />
                                    </li>
                                    <li>
                                        <Typography
                                            variant={"body1"}
                                            dangerouslySetInnerHTML={{
                                                __html: t(
                                                    "privacy:To send newsletters and marketing materials upon subscription"
                                                ),
                                            }}
                                        />
                                        <Typography
                                            variant={"body1"}
                                            dangerouslySetInnerHTML={{
                                                __html: t("privacy:If User subscribes our newsletter on__"),
                                            }}
                                        />
                                    </li>
                                    <li>
                                        <Typography
                                            variant={"body1"}
                                            dangerouslySetInnerHTML={{
                                                __html: t("privacy:To administer any features on the Site"),
                                            }}
                                        />
                                        <Typography
                                            variant={"body1"}
                                            dangerouslySetInnerHTML={{
                                                __html: t("privacy:If Users enter into a sweepstak__"),
                                            }}
                                        />
                                    </li>
                                </ol>
                            </div>
                        </li>

                        <li>
                            {t("privacy:How We Protect Your Data")}
                            <div>
                                <Typography
                                    variant={"body1"}
                                    dangerouslySetInnerHTML={{
                                        __html: t("privacy:We adopt appropriate data collection__"),
                                    }}
                                />
                            </div>
                        </li>

                        <li>
                            {t("privacy:Data Sharing and Disclosure")}
                            <div>
                                <ol>
                                    <li>{t("privacy:We will not share Personal Data__")}</li>
                                    <li>{t("privacy:We may use third-party service providers__")}</li>
                                    <li>{t("privacy:We may share generic aggregated demographic__")}</li>
                                </ol>
                            </div>
                        </li>

                        <li>
                            {t("privacy:Advertising")}
                            <div>
                                <Typography
                                    variant={"body1"}
                                    dangerouslySetInnerHTML={{
                                        __html: t("privacy:Advertisements may appear on our products__"),
                                    }}
                                />
                            </div>
                        </li>

                        <li>
                            {t("privacy:Third-Party Sites")}
                            <div>
                                <Typography
                                    variant={"body1"}
                                    dangerouslySetInnerHTML={{
                                        __html: t("privacy:The Site may contain links to third-party websites__"),
                                    }}
                                />
                            </div>
                        </li>

                        <li>
                            {t("privacy:Changes to Our Privacy Policy")}
                            <div>
                                <Typography
                                    variant={"body1"}
                                    dangerouslySetInnerHTML={{
                                        __html: t("privacy:We regularly review our Privacy Policy and__"),
                                    }}
                                />
                            </div>
                        </li>

                        <li>
                            {t("privacy:Online Privacy Policy Only")}
                            <div>
                                <Typography
                                    variant={"body1"}
                                    dangerouslySetInnerHTML={{
                                        __html: t("privacy:This online Privacy Policy applies only to__"),
                                    }}
                                />
                            </div>
                        </li>

                        <li>
                            {t("privacy:Your Rights")}
                            <div>
                                <Typography
                                    variant={"body1"}
                                    dangerouslySetInnerHTML={{
                                        __html: t("privacy:With respect to your Personal Data provided__"),
                                    }}
                                />
                                <ol>
                                    <li>{t("privacy:to make an inquiry of and to review your personal data")}</li>
                                    <li>{t("privacy:to request a copy of your personal data")}</li>
                                    <li>{t("privacy:to supplement or correct your personal data")}</li>
                                    <li>{t("privacy:to demand the cessation of the collection__")}</li>
                                    <li>{t("privacy:to erase your personal data")}</li>
                                </ol>
                            </div>
                        </li>

                        <li>
                            {t("privacy:Commitment to Your Privacy")}
                            <div>
                                <Typography
                                    variant={"body1"}
                                    dangerouslySetInnerHTML={{
                                        __html: t("privacy:To ensure the security of your information__"),
                                    }}
                                />
                            </div>
                        </li>

                        <li>
                            {t("privacy:Contacting us")}
                            <div>
                                <Typography
                                    variant={"body1"}
                                    dangerouslySetInnerHTML={{
                                        __html: t("privacy:If you have any questions about this Privacy Policy__"),
                                    }}
                                />
                                <a href={t("privacy:www")} rel="noopener noreferrer">
                                    {t("privacy:www")}
                                </a>
                                <br />
                                <a href={`mailto:${t("privacy:email")}`}>{t("privacy:email")}</a>
                            </div>
                        </li>
                    </ol>
                </Container>
            </SectionContainer>
        </Layout>
    );
};
export default PrivacyPage;
