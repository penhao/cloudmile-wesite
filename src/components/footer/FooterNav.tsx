import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Theme } from "@material-ui/core";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { useLinkStyles } from "../links/LinkStyles";
import NavLink from "../links/NavLink";
import { makeStyles } from "@material-ui/styles";
import useTranslation from "next-translate/useTranslation";
import FooterSocialList from "./FooterSocialList";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import { useRouter } from "next/router";
import Routes, { getRoute, IRoute } from "../../@share/routes/Routes";

interface Props {
    statusData: any;
}
const useStyles = makeStyles((theme: Theme) => ({
    group: {
        [theme.breakpoints.up("md")]: {
            flex: "0 1 auto",
        },
    },
    title: {
        fontSize: theme.typography.pxToRem(16),
        fontWeight: theme.typography.fontWeightBold,
        lineHeight: "normal",
        marginBottom: "10px",
        whiteSpace: "nowrap",
    },
    subTitle: {
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.grey["400"],
        marginBottom: "10px",
        whiteSpace: "nowrap",
    },
    contactGroup: {
        [theme.breakpoints.up("sm")]: {
            flex: "0 1 auto",
        },
        [theme.breakpoints.up("md")]: {
            marginLeft: "auto",
        },
    },
    divider: {
        marginBottom: "20px",
        backgroundColor: theme.palette.common.black,
    },
    subGroup: {
        marginBottom: "20px",
        paddingRight: "40px",
        "&:last-child": {
            marginBottom: 0,
        },
    },
    linkList: {
        "& li": {
            marginBottom: "10px",
            "&:last-child": {
                marginBottom: 0,
            },
        },
    },
    link: {
        display: "inline-block",
    },
    linkLabel: {
        right: "-30px",
        top: 0,
    },
    address: {
        fontStyle: "normal",
        margin: "20px 0",
        "& ul": {
            "& li": {
                marginBottom: "4px",
            },
        },
    },
}));
const FooterNav = ({ statusData }: Props) => {
    const router = useRouter();
    const { t, lang } = useTranslation();
    const classes = useStyles();
    const linkClasses = useLinkStyles();
    const mdUp = useMediaQuery(useTheme().breakpoints.up("md"));
    const getStatus = (breadcrumbName: string) => {
        switch (breadcrumbName) {
            case "Blog":
                return statusData?.blog;
            case "Media Center":
                return statusData?.news;
            case "Case Study":
                return statusData?.case;
            case "Event":
                return statusData?.event;
            case "Video":
                return statusData?.video;
            default:
                return false;
        }
    };
    const getLinkActive = (path: string) => {
        return router.asPath.includes(path.toLowerCase());
    };
    const getNavLink = (routes: IRoute[]) => {
        return (
            <ul className={classes.linkList}>
                {routes.map((route: IRoute) => {
                    if (route.disabled) return;
                    const routeName = t(`common:${route.breadcrumbName}`);
                    const routeHref: string = route.path !== undefined ? route.path : route.link[lang];
                    const isLaunch: boolean = route.path === undefined;
                    return (
                        <li key={uuidv4()}>
                            <NavLink
                                hrefPath={routeHref}
                                textWrap={false}
                                isLaunch={isLaunch}
                                classNames={clsx(
                                    classes.link,
                                    mdUp ? linkClasses.styleLink : linkClasses.textLink,
                                    getLinkActive(routeHref) ? "active" : null
                                )}
                            >
                                <span className={linkClasses.styleEffect}>{routeName}</span>
                                {getStatus(route.breadcrumbName) ? (
                                    <span className={clsx(classes.linkLabel, linkClasses.statusLabel)}>New</span>
                                ) : null}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        );
    };
    const getNavList = () => {
        return Routes.map((route: IRoute) => {
            if (route.disabled) return;
            const subRoutes = route.routes;
            return (
                <Grid item xs={12} sm key={uuidv4()} className={classes.group}>
                    <Typography component={"h4"} className={classes.title}>
                        {t(`common:${route.breadcrumbName}`)}
                    </Typography>
                    <Divider classes={{ root: classes.divider }} />
                    {subRoutes[0].routes !== undefined ? (
                        subRoutes.map((route: IRoute) => {
                            return (
                                <div className={classes.subGroup} key={uuidv4()}>
                                    <Typography className={classes.subTitle}>
                                        {t(`common:${route.breadcrumbName}`)}
                                    </Typography>
                                    {getNavLink(route.routes)}
                                </div>
                            );
                        })
                    ) : (
                        <div className={classes.subGroup}>{getNavLink(subRoutes)}</div>
                    )}
                </Grid>
            );
        });
    };
    const getContactNavList = () => {
        const contactRoute: IRoute = getRoute("/contact");
        return (
            <Grid item xs={12} sm className={clsx(classes.group, classes.contactGroup)}>
                <Typography component={"h4"} className={classes.title}>
                    {t(`common:${contactRoute.breadcrumbName}`)}
                </Typography>
                <Divider classes={{ root: classes.divider }} />
                <div className={classes.subGroup}>
                    <ul className={classes.linkList}>
                        <li>
                            <NavLink
                                hrefPath={contactRoute.path}
                                textWrap={false}
                                classNames={clsx(
                                    classes.link,
                                    mdUp ? linkClasses.styleLink : linkClasses.textLink,
                                    getLinkActive(contactRoute.path) ? "active" : null
                                )}
                            >
                                <span className={linkClasses.styleEffect}>
                                    {t(`common:${contactRoute.breadcrumbName}`)}
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                    <address className={classes.address}>
                        <ul>
                            <li>
                                <NavLink
                                    isLaunch={true}
                                    underline={true}
                                    hrefPath={"tel:+886227576077"}
                                    classNames={clsx(linkClasses.textLink)}
                                >
                                    (TW) +886-2-2757-6077
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    isLaunch={true}
                                    underline={true}
                                    hrefPath={"tel:+85234810068"}
                                    classNames={clsx(linkClasses.textLink)}
                                >
                                    (HK) +852-3481-0068
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    isLaunch={true}
                                    underline={true}
                                    hrefPath={"tel:+6569932383"}
                                    classNames={clsx(linkClasses.textLink)}
                                >
                                    (SG) +65-6993-2383
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    isLaunch={true}
                                    underline={true}
                                    hrefPath={"mailto:service@mile.cloud"}
                                    classNames={clsx(linkClasses.textLink)}
                                >
                                    service@mile.cloud
                                </NavLink>
                            </li>
                        </ul>
                    </address>
                    <Grid container spacing={2} className={classes.subGroup}>
                        <FooterSocialList />
                    </Grid>
                </div>
            </Grid>
        );
    };
    return (
        <Grid container spacing={4} component={"nav"}>
            <Hidden xsDown>{getNavList()}</Hidden>
            {getContactNavList()}
        </Grid>
    );
};
export default FooterNav;
