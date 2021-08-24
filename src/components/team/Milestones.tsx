import React, { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import SectionContainer from "../containers/SectionContainer";
import Container from "../containers/Container";
import { Grid, Theme } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import SectionDescWrapper from "../sections/SectionDescWrapper";
import SectionTitleLabel from "../sections/SectionTitleLabel";
import SectionTitle from "../sections/SectionTitle";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import RatioContainer from "../containers/RatioContainer";
import ResponseImage from "../Images/ResponseImage";
import ParallaxEffect from "../effects/ParallaxEffect";
import ImageClipEffect from "../effects/ImageClipEffect";
import useTranslation from "next-translate/useTranslation";
import ColorGraphic from "../sections/ColorGraphic";
import { Controller, Scene } from "react-scrollmagic";
import HistoryData, { IHistory } from "./HistoryData";
import HistoryAccordion from "./HistoryAccordion";

const useStyles = makeStyles((theme: Theme) => ({
    item: {
        "&::before": {
            position: "absolute",
            display: "block",
            content: '""',
            width: "6px",
            height: "6px",
            left: "-3px",
            top: "38px",
            borderRadius: "99em",
            backgroundColor: theme.palette.secondary.main,
            opacity: 0,
            [theme.breakpoints.up("sm")]: {
                top: "52px",
            },
        },
        "&::after": {
            position: "absolute",
            display: "block",
            content: '""',
            width: "6px",
            height: 0,
            left: "-3px",
            top: "48px",
            borderRadius: "99em",
            backgroundColor: theme.palette.primary.main,
            opacity: 0,
            [theme.breakpoints.up("sm")]: {
                top: "62px",
            },
        },
    },
    itemActive: {
        "&::before": {
            opacity: 1,
            transition: theme.transitions.create(["opacity"], {
                easing: theme.transitions.easing.easeOut,
                duration: "0.7s",
            }),
        },
        "&::after": {
            opacity: 1,
            height: "calc(100% - 14px)",
            transition: theme.transitions.create(["opacity", "height"], {
                easing: theme.transitions.easing.easeOut,
                duration: "1s",
            }),
        },
    },
    list: {
        paddingLeft: "20px",
        "& li": {
            position: "relative",
            "&:nth-child(odd)": {
                [theme.breakpoints.up("md")]: {
                    transform: "translate(-100%)",
                    "& $item": {
                        textAlign: "right",
                        "&::before, &::after": {
                            left: "auto",
                            right: "-3px",
                        },
                    },
                },
            },
            "&:last-child": {
                "& $item": {
                    "&::after": {
                        content: "none",
                    },
                },
            },
            "& h4": {
                position: "relative",
                fontSize: theme.typography.pxToRem(32),
                lineHeight: 1.17,
                fontWeight: 700,
                zIndex: 2,
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(60),
                },
            },
            "& p": {
                position: "relative",
                zIndex: 2,
            },
        },
        [theme.breakpoints.up("sm")]: {
            paddingLeft: 0,
        },
        [theme.breakpoints.up("md")]: {
            marginBottom: "130px",
        },
    },
    list202011: {
        [theme.breakpoints.up("md")]: {
            paddingBottom: "140px !important",
        },
    },
    list202004: {
        [theme.breakpoints.up("md")]: {
            paddingBottom: "140px !important",
        },
    },
    cover201911: {
        position: "absolute",
        width: "440px",
        top: "-110px",
        left: "-460px",
    },
    cover201804: {
        position: "absolute",
        width: "440px",
        bottom: "25px",
        left: "180px",
    },
    cover201803: {
        position: "absolute",
        width: "460px",
        top: "50%",
        right: "180px",
        transform: "translateY(-50%)",
    },
    cover201612: {
        position: "absolute",
        width: "460px",
        top: "0",
        left: "-460px",
    },
    colorDot201911: {
        position: "absolute",
        top: "20px",
        left: "-320px",
        zIndex: 1,
    },
    colorDot201804: {
        position: "absolute",
        top: "-200px",
        right: "-100px",
        zIndex: 1,
    },
    colorDot201612: {
        position: "absolute",
        top: "-90px",
        left: "-90px",
        zIndex: 1,
    },
    historyWrapper: {
        [theme.breakpoints.up("md")]: {
            width: "calc(100% + 40px)",
            marginLeft: "-20px",
        },
    },
}));
const Milestones = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <SectionContainer>
            <Container>
                <Grid container spacing={4}>
                    <Hidden smDown>
                        <Grid item xs={12} md={6} />
                    </Hidden>
                    <Grid item xs={12} md={6}>
                        <Container maxWidth={{ sm: 600, md: 600 }} paddingX={false} centerX={false}>
                            <SectionTitleLabel color={"warning"} />
                            <SectionTitle>{t("team:Key Milestones")}</SectionTitle>
                        </Container>
                    </Grid>
                    <Grid item xs={12}>
                        <SectionDescWrapper>
                            <div className={classes.historyWrapper}>
                                {HistoryData.length &&
                                    HistoryData.map((history: IHistory, index: number) => {
                                        return (
                                            <Fragment key={uuidv4()}>
                                                <HistoryAccordion
                                                    data={history}
                                                    lastHistory={index === HistoryData.length - 1}
                                                />
                                            </Fragment>
                                        );
                                    })}
                            </div>
                        </SectionDescWrapper>
                    </Grid>
                </Grid>
            </Container>
        </SectionContainer>
    );
};

export default Milestones;
