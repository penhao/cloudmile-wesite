import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-translate/useTranslation";
import Container from "../containers/Container";
import NavLink from "../links/NavLink";
import Copyright from "./Copyright";
import FooterNav from "./FooterNav";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { useLinkStyles } from "../links/LinkStyles";
import { fetchNavStatus } from "../../services/ApiServices";
import { useRouter } from "next/router";
import { getRoute } from "../../@share/routes/Routes";

export const useStyles = makeStyles((theme: Theme) => ({
    footer: {
        position: "relative",
        width: "100%",
        padding: "40px 0 100px 0",
        backgroundColor: theme.palette.grey["200"],
        zIndex: 2,
        [theme.breakpoints.up("sm")]: {
            padding: "40px 0 25px 0",
        },
    },
    legal: {
        marginTop: "20px",
        [theme.breakpoints.up("sm")]: {
            marginTop: "50px",
        },
        "& .MuiGrid-item": {
            [theme.breakpoints.up("sm")]: {
                flex: "0 1 auto",
            },
        },
    },
    privacyLinks: {
        display: "flex",
        "& li": {
            padding: "0 20px",
            borderLeft: `1px solid ${theme.palette.common.black}`,
        },
    },
}));

const Footer = () => {
    const router = useRouter();
    const classes = useStyles();
    const linkClasses = useLinkStyles();
    const { t, lang } = useTranslation();
    const [statusData, setStatusData] = useState<any | null>(null);
    const privacyRoute = getRoute("/privacy");
    const termsRoute = getRoute("/terms");
    useEffect(() => {
        const fetchData = async () => {
            return fetchNavStatus(lang);
        };
        fetchData().then((response: any) => {
            if (response.status) {
                setStatusData(response.data);
            }
        });
    }, [router, lang]);
    return (
        <footer className={classes.footer}>
            <Container maxWidth={{ md: 1280 }}>
                <FooterNav statusData={statusData} />
                <Grid container spacing={2} className={classes.legal}>
                    <Grid item xs={12} sm>
                        <Copyright />
                    </Grid>
                    <Grid item xs={12} sm>
                        <ul className={classes.privacyLinks}>
                            <li>
                                <NavLink
                                    hrefPath={privacyRoute.path}
                                    underline={true}
                                    classNames={clsx(linkClasses.textLink)}
                                >
                                    {t(`common:${privacyRoute.breadcrumbName}`)}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink hrefPath={"/terms"} underline={true} classNames={clsx(linkClasses.textLink)}>
                                    {t("common:Information Security Policy")}
                                </NavLink>
                            </li>
                        </ul>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
};
export default Footer;
