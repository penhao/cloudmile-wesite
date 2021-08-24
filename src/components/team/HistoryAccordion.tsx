import React, { useState, Fragment, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { makeStyles, Theme, Typography, Hidden } from "@material-ui/core";
import clsx from "clsx";
import IconMinus from "../icons/IconMinus";
import IconPlus from "../icons/IconPlus";
import { IHistory, IHistoryItem } from "./HistoryData";
import { useTranslation } from "next-translate";
import ResponseImage from "../Images/ResponseImage";
import { useEffect } from "react";
import ParallaxEffect from "../effects/ParallaxEffect";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: "relative",
        paddingBottom: "55px",
        "&::after": {
            position: "absolute",
            display: "block",
            content: '""',
            width: "6px",
            height: "52px",
            bottom: 0,
            left: "3px",
            borderRadius: "99em",
            backgroundColor: theme.palette.primary.main,
        },
        [theme.breakpoints.up("md")]: {
            "&::after": {
                left: "50%",
                transform: "translateX(-50%)",
            },
        },
        "&.lastHistory": {
            paddingBottom: 0,
            "&::after": {
                content: "none",
            },
            "& $details": {
                "&.active": {
                    [theme.breakpoints.up("md")]: {
                        paddingBottom: "160px",
                    },
                },
            },
            "& $listItem": {
                "&:last-child": {
                    "&::after": {
                        content: "none",
                    },
                },
            },
        },
        "&.active": {
            paddingBottom: 0,
            "&::after": {
                content: "none",
            },
            "& $year": {
                "& .icon": {
                    transform: "rotate(180deg)",
                },
            },
        },
        "& .historyCover": {
            position: "absolute",
        },
        "& .historyDot": {
            position: "absolute",
            display: "block",
            borderRadius: "99em",
            mixBlendMode: "multiply",
            backgroundBlendMode: "multiply",
        },
        "& .item-2020-November": {
            "& .historyCover": {
                width: "440px",
                bottom: "10px",
                left: "-460px",
            },
        },
        "& .item-2020-October": {
            "& .historyDot": {
                width: "430px",
                height: "430px",
                left: "-210px",
                top: "-50px",
                backgroundColor: theme.palette.primary.main,
            },
        },
        "& .item-2018-June": {
            "& .historyCover": {
                width: "440px",
                bottom: "-20px",
                left: "-460px",
            },
            "& .historyDot": {
                width: "180px",
                height: "180px",
                left: "-550px",
                top: "-50px",
                backgroundColor: theme.palette.secondary.main,
            },
        },
        "& .item-2018-September": {
            "& .historyDot": {
                width: "300px",
                height: "300px",
                right: "-150px",
                bottom: 0,
                backgroundColor: theme.palette.warning.main,
            },
        },
        "& .item-2017-December": {
            "& .historyCover": {
                width: "426px",
                top: "0",
                right: "-20px",
            },
        },
        "& .item-2017-August": {
            "& .historyCover": {
                width: "440px",
                top: "-45px",
                left: "-20px",
            },
        },
        "& .item-2016-December": {
            "& .historyCover": {
                width: "440px",
                top: "25px",
                left: "-460px",
            },
        },
    },
    year: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: theme.palette.warning.main,
        textAlign: "center",
        fontSize: "30px",
        fontWeight: "bold",
        lineHeight: "normal",
        letterSpacing: "normal",
        cursor: "pointer",
        "& .icon": {
            position: "relative",
            display: "block",
            lineHeight: 0,
            transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.short,
            }),
            transformOrigin: "center",
            width: "16px",
            height: "16px",
            marginLeft: "10px",
            [theme.breakpoints.up("sm")]: {
                width: "20px",
                height: "20px",
            },
            [theme.breakpoints.up("md")]: {
                marginLeft: 0,
                marginTop: ({ lang }: { lang: string }) => {
                    return lang === "zh" ? "10px" : 0;
                },
            },
            "& svg": {
                position: "absolute",
                top: 0,
                left: 0,
                width: "16px",
                height: "16px",

                [theme.breakpoints.up("sm")]: {
                    width: "20px",
                    height: "20px",
                },
                [theme.breakpoints.up("md")]: {},
            },
        },
        [theme.breakpoints.up("sm")]: {
            fontSize: "72px",
            lineHeight: 0.97,
            letterSpacing: "normal",
            marginBottom: "10px",
        },
        [theme.breakpoints.up("md")]: {
            flexDirection: "column",
        },
    },
    desc: { position: "relative" },
    month: {
        position: "relative",
        fontSize: theme.typography.pxToRem(20),
        lineHeight: "normal",
        fontWeight: "bold",
        letterSpacing: "normal",
        marginBottom: "10px",
        [theme.breakpoints.up("sm")]: {
            fontSize: "60px",
            lineHeight: 1.17,
            letterSpacing: "normal",
        },
    },
    mask: {
        position: "relative",
        height: 0,
        overflow: "hidden",
        transition: theme.transitions.create("all", {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeOut,
        }),
        "&.active": {
            height: "auto",
        },
    },
    details: {
        paddingTop: "30px",
        paddingBottom: "36px",
        [theme.breakpoints.up("sm")]: {
            paddingBottom: "55px",
        },
        "&.active": {
            height: "100%",
            "&::before": {
                position: "absolute",
                display: "block",
                content: '""',
                width: "6px",
                height: "64px",
                top: 0,
                left: "3px",
                borderRadius: "99em",
                backgroundColor: theme.palette.primary.main,
                [theme.breakpoints.up("sm")]: {
                    height: "78px",
                },
                [theme.breakpoints.up("md")]: {
                    left: "50%",
                    transform: "translateX(-50%)",
                },
            },
        },
    },
    list: {
        width: "50%",
    },
    listItem: {
        position: "relative",
        display: "flex",
        justifyContent: "flex-start",
        textAlign: "left",

        [theme.breakpoints.up("md")]: {
            justifyContent: "flex-start",
            textAlign: "right",
            maxWidth: "1280px",
            margin: "0 auto",
            "& $listItemInner": {
                paddingLeft: 0,
                paddingRight: "20px",
            },
        },
        "&::before": {
            position: "absolute",
            display: "block",
            content: '""',
            width: "6px",
            height: "6px",
            top: "38px",
            left: "3px",
            borderRadius: "99em",
            backgroundColor: theme.palette.secondary.main,
            [theme.breakpoints.up("sm")]: {
                top: "52px",
            },
            [theme.breakpoints.up("md")]: {
                left: "50%",
                transform: "translateX(-50%)",
            },
        },
        "&::after": {
            position: "absolute",
            display: "block",
            content: '""',
            width: "6px",
            height: "calc(100% - 14px)",
            top: "48px",
            left: "3px",
            borderRadius: "99em",
            backgroundColor: theme.palette.primary.main,
            [theme.breakpoints.up("sm")]: {
                top: "62px",
            },
            [theme.breakpoints.up("md")]: {
                left: "50%",
                transform: "translateX(-50%)",
            },
        },
        "&.reverse": {
            justifyContent: "flex-start",
            textAlign: "left",
            [theme.breakpoints.up("md")]: {
                justifyContent: "flex-end",
                "& $listItemInner": {
                    paddingLeft: "20px",
                    paddingRight: 0,
                },
            },
        },
    },
    listItemInner: {
        position: "relative",
        padding: "20px 0 20px 25px",
        [theme.breakpoints.up("sm")]: {
            padding: "20px 0 20px 25px",
        },
        [theme.breakpoints.up("md")]: {
            width: "50%",
            padding: "10px 0 10px 20px",
        },
    },
}));

interface IProps {
    data: IHistory;
    lastHistory: boolean;
}
const HistoryAccordion = ({ data, lastHistory = false }: IProps) => {
    const { t, lang } = useTranslation();
    const [open, setOpen] = useState(false);
    const detailRef = useRef(null);
    const [detailHeight, setDetailHeight] = useState(0);
    const classes = useStyles({ detailHeight, lang });
    const handleClick = () => setOpen((open) => !open);

    useEffect(() => {
        setOpen(data.year === "2021");
    }, [data]);

    useEffect(() => {
        if (detailRef.current) {
            setDetailHeight(detailRef.current.offsetHeight);
        }

        window.addEventListener("resize", () => {
            if (detailRef.current) {
                setDetailHeight(detailRef.current.offsetHeight);
            }
        });
        return () => {
            window.removeEventListener("resize", () => {});
        };
    }, []);

    return (
        <div className={clsx(classes.root, open && "active", lastHistory && "lastHistory")}>
            <div className={classes.year} onClick={handleClick}>
                {data.year}
                <div className={"icon"}>{open ? <IconMinus /> : <IconPlus />}</div>
            </div>
            <div className={clsx(classes.mask, open && "active")}>
                <div ref={detailRef} className={clsx(classes.details, open && "active")}>
                    {data.items.length &&
                        data.items.map((item: IHistoryItem) => {
                            return (
                                <Fragment key={uuidv4()}>
                                    <div
                                        className={clsx(
                                            classes.listItem,
                                            item.reverse && "reverse",
                                            `item-${data.year}-${item.month}`
                                        )}
                                    >
                                        <div className={classes.listItemInner}>
                                            {item.imageUrl && (
                                                <Hidden smDown>
                                                    <div className={"historyCover"}>
                                                        <ParallaxEffect>
                                                            <ResponseImage imageUrl={item.imageUrl} alt={""} />
                                                        </ParallaxEffect>
                                                    </div>
                                                </Hidden>
                                            )}
                                            {item.dot && (
                                                <Hidden smDown>
                                                    <span className={"historyDot"}></span>
                                                </Hidden>
                                            )}
                                            <Typography variant={"h4"} color={"error"} className={classes.month}>
                                                {t(`team:${item.month}`)}
                                            </Typography>
                                            <Typography variant={"body1"} className={classes.desc}>
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: t(`team:${item.desc}`),
                                                    }}
                                                />
                                            </Typography>
                                        </div>
                                    </div>
                                </Fragment>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};
export default HistoryAccordion;
