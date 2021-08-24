import React from "react";
import SectionContainer from "../containers/SectionContainer";
import Container from "../containers/Container";
import Grid from "@material-ui/core/Grid";
import SectionDescWrapper from "../sections/SectionDescWrapper";
import ShiftContainer from "../containers/ShiftContainer";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import useTranslation from "next-translate/useTranslation";

interface IStyleProps {
    lang: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    value: {
        fontSize: theme.typography.pxToRem(32),
        lineHeight: 1.17,
        fontWeight: 700,
        whiteSpace: "nowrap",
        [theme.breakpoints.up("sm")]: {
            fontSize: theme.typography.pxToRem(60),
        },
    },
    label: {
        paddingLeft: ({ lang }: IStyleProps) => {
            return lang === "zh" || lang === "zh-hant" ? "5px" : 0;
        },
    },
    values: {
        "& li": {
            flexGrow: 0,
            [theme.breakpoints.up("md")]: {
                flexGrow: 1,
            },
        },
    },
}));
const Intro = () => {
    const { t, lang } = useTranslation();
    const classes = useStyles({ lang });

    return (
        <SectionContainer>
            <Container maxWidth={{ md: 1280 }}>
                <Grid container spacing={4}>
                    <Hidden smDown>
                        <Grid item xs={12} md={6} />
                    </Hidden>
                    <Grid item xs={12} md={6}>
                        <SectionDescWrapper>
                            <ShiftContainer shiftX={{ md: -160 }} growX={{ md: 160 }}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <Typography variant={"body1"}>
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: t("team:CloudMile is a cloud and AI company__"),
                                                }}
                                            />
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ShiftContainer shiftX={{ md: -210 }}>
                                            <Grid container component={"ul"} spacing={4} className={classes.values}>
                                                <Grid item xs component={"li"}>
                                                    <Typography
                                                        variant={"h3"}
                                                        color={"error"}
                                                        className={classes.value}
                                                    >
                                                        100+
                                                    </Typography>
                                                    <Typography
                                                        variant={"body1"}
                                                        component={"div"}
                                                        className={classes.label}
                                                    >
                                                        {t("team:Employees")}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs component={"li"}>
                                                    <Typography
                                                        variant={"h3"}
                                                        color={"error"}
                                                        className={classes.value}
                                                    >
                                                        400+
                                                    </Typography>
                                                    <Typography
                                                        variant={"body1"}
                                                        component={"div"}
                                                        className={classes.label}
                                                    >
                                                        {t("team:Customers")}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs component={"li"}>
                                                    <Typography
                                                        variant={"h3"}
                                                        color={"error"}
                                                        className={classes.value}
                                                    >
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: t("team:Singapore,Hong Kong,Taiwan,Malaysia"),
                                                            }}
                                                        />
                                                    </Typography>
                                                    <Typography
                                                        variant={"body1"}
                                                        component={"div"}
                                                        className={classes.label}
                                                    >
                                                        {t("team:The Countries We Are In")}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </ShiftContainer>
                                    </Grid>
                                </Grid>
                            </ShiftContainer>
                        </SectionDescWrapper>
                    </Grid>
                </Grid>
            </Container>
        </SectionContainer>
    );
};

export default Intro;
