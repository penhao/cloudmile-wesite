import React, { useEffect, useState } from "react";
import Sticky from "react-sticky-el";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core";
import Container from "../../containers/Container";
import SectionContainer from "../../containers/SectionContainer";
import SectionLabel from "../SectionLabel";
import SectionTitleLabel from "../SectionTitleLabel";
import SectionTitle from "../SectionTitle";
import SectionDescWrapper from "../SectionDescWrapper";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import useTranslation from "next-translate/useTranslation";

type IListItem = {
    value: string;
    desc: string;
};
const useStyles = makeStyles((theme: Theme) => ({
    technology: {
        marginTop: "40px",
        [theme.breakpoints.up("sm")]: {
            marginTop: 0,
        },
    },
    wrapper: {
        display: "flex",
        alignItems: "center",
        position: "relative",
        width: "100%",
        paddingTop: "40px",
        paddingBottom: "40px",
        marginTop: "40px",
        [theme.breakpoints.up("md")]: {
            height: "100vh",
            marginTop: 0,
        },
    },
    titleWrapper: {
        position: "relative",
        [theme.breakpoints.up("md")]: {
            paddingRight: "20px",
        },
    },
    bgColor: {
        position: "absolute",
        width: "calc(100% + 40px)",
        height: "100%",
        top: 0,
        left: "-20px",
        backgroundColor: theme.palette.primary.main,
        [theme.breakpoints.up("md")]: {
            width: "100%",
        },
    },
    scrollArea: {
        display: "block",
        width: "1px",
        height: "100vh",
    },
    valueList: {
        "& li": {
            marginBottom: "40px",
            "&:last-child": {
                marginBottom: 0,
            },
        },
        [theme.breakpoints.up("md")]: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
            paddingLeft: "20px",
        },
    },
    value: {
        fontSize: theme.typography.pxToRem(32),
        lineHeight: 1.17,
        fontWeight: 700,
        letterSpacing: "normal",
        color: theme.palette.error.main,
        marginBottom: "5px",
        [theme.breakpoints.up("sm")]: {
            fontSize: theme.typography.pxToRem(60),
        },
    },
}));
const HomeAITechnology = () => {
    const classes = useStyles();
    const { t, lang } = useTranslation();
    const mdUp = useMediaQuery(useTheme().breakpoints.up("md"));

    const [list, setList] = useState<IListItem[] | null>(null);
    useEffect(() => {
        setList([
            {
                value: "20&nbsp;+",
                desc: t("home:Served customers across over__"),
            },
            {
                value: "1&nbsp;",
                desc: t("home:Established MarTech company, Ainotam, that__"),
            },
            {
                value: "45&nbsp;+",
                desc: t("home:Over 45 CloudMile’s Cloud and Machine Learning__"),
            },
        ]);
    }, [lang]);

    const getTitle = () => {
        return (
            <div className={classes.wrapper}>
                <span className={classes.bgColor} />
                <Box width="100%" className={classes.titleWrapper}>
                    <Box width="100%" display={"flex"} justifyContent={mdUp ? "flex-end" : "flex-start"}>
                        <Container maxWidth={{ xs: "none", sm: 600, md: 600 }} paddingX={false} centerX={false}>
                            <SectionTitleLabel color={"warning"} />
                            <SectionTitle>{t("home:Proven AI technology powered by experts")}</SectionTitle>
                        </Container>
                    </Box>
                    <SectionLabel>AI TECHNOLOGY</SectionLabel>
                </Box>
            </div>
        );
    };
    return (
        <SectionContainer className={"technology"}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        {mdUp ? <Sticky boundaryElement={".technology"}>{getTitle()}</Sticky> : getTitle()}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Container maxWidth={{ xs: "none", sm: "none", md: 600 }} paddingX={false} centerX={false}>
                            <SectionDescWrapper>
                                <Hidden smDown>
                                    <span className={classes.scrollArea} />
                                </Hidden>
                                {list && list.length ? (
                                    <ul className={classes.valueList}>
                                        {list.map((item: IListItem, index: number) => {
                                            return (
                                                <li key={index}>
                                                    <Typography
                                                        variant={"h3"}
                                                        className={classes.value}
                                                        dangerouslySetInnerHTML={{ __html: item.value }}
                                                    />
                                                    <Typography variant={"body1"}>{item.desc}</Typography>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : null}
                            </SectionDescWrapper>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </SectionContainer>
    );
};
export default HomeAITechnology;
