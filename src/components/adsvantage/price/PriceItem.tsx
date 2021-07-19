import React, { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from "@material-ui/styles";
import { Theme, Typography, Box, Divider, Button } from "@material-ui/core";
import { UserPriceProps } from "../useUserPrice";
import clsx from "clsx";
import useTranslation from "next-translate/useTranslation";

interface Props {
    type: 'User' | 'Agency';
    data: UserPriceProps;
}

interface IStyleProps {
    type: 'User' | 'Agency';
    topic: boolean;
    lang: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    item: {
        position: 'relative',
        width: '100%',
        height: '100%',
        paddingTop: '38px',

    },
    itemInner: {
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: '0 10px 30px 10px',
        boxShadow: '0 2px 14px 0 rgba(137, 174, 255, 0.2)',
        backgroundColor: '#ededed',
        borderTopLeftRadius: ({ topic }: IStyleProps) => topic ? 0 : '10px',
        borderTopRightRadius: ({ topic }: IStyleProps) => topic ? 0 : '10px',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px'
    },
    row: {
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 0'
    },
    growRow: {
        flexGrow: 1
    },
    topic: {
        position: 'absolute',
        width: '100%',
        height: '38px',
        top: 0,
        padding: '6px',
        fontWeight: 500,
        letterSpacing: '0.6px',
        backgroundColor: ({ type }: IStyleProps) => {
            return (type === 'User')
                ? theme.palette.primary.main
                : (type === 'Agency') ? theme.palette.secondary.main : theme.palette.primary.main
        },
        color: theme.palette.common.white,
        boxShadow: '0 2px 14px 0 rgba(137, 174, 255, 0.2)',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        zIndex: 1
    },
    projectName: {
        fontWeight: 600,
        letterSpacing: '0.9px',
        color: ({ type }: IStyleProps) => {
            return (type === 'User')
                ? theme.palette.primary.main
                : (type === 'Agency') ? theme.palette.secondary.main : theme.palette.primary.main
        },
    },
    priceDesc: {
        '& span': {
            fontWeight: 600,
            color: ({ type }: IStyleProps) => {
                return (type === 'User')
                    ? theme.palette.secondary.main
                    : (type === 'Agency') ? theme.palette.primary.main : theme.palette.secondary.main
            },
        }
    },
    price: {
        fontSize: '50px',
        fontWeight: 600,
        lineHeight: 1,
        color: ({ type }: IStyleProps) => {
            return (type === 'User')
                ? theme.palette.primary.main
                : (type === 'Agency') ? theme.palette.secondary.main : theme.palette.primary.main
        },
        '& span': {
            fontSize: '30px'
        }
    },
    pricePrefix: {
        fontSize: '60px',
        fontWeight: 600,
        lineHeight: 1,
        color: ({ type }: IStyleProps) => {
            return (type === 'User')
                ? theme.palette.primary.main
                : (type === 'Agency') ? theme.palette.secondary.main : theme.palette.primary.main
        },
    },
    priceUnit: {
        display: ({ lang }: IStyleProps) => lang === 'en' ? 'block' : 'inline',
        fontSize: '20px',
        fontWeight: 600,
        color: ({ type }: IStyleProps) => {
            return (type === 'User')
                ? theme.palette.primary.main
                : (type === 'Agency') ? theme.palette.secondary.main : theme.palette.primary.main
        },
    },
    detailList: {
        letterSpacing: '0.6px',
        '& li': {
            marginBottom: '5px',
            '&:last-child': {
                marginBottom: 0
            }
        },
        '& span': {
            fontWeight: 600,
            color: ({ type }: IStyleProps) => {
                return (type === 'User')
                    ? theme.palette.primary.main
                    : (type === 'Agency') ? theme.palette.secondary.main : theme.palette.primary.main
            },
        },
        '&.disabled': {
            opacity: 0
        }
    },
    divider: {
        backgroundColor: ({ type }: IStyleProps) => {
            return (type === 'User')
                ? theme.palette.primary.main
                : (type === 'Agency') ? theme.palette.secondary.main : theme.palette.primary.main
        },
        opacity: 0.5
    },
    actions: {},
    link: {
        width: '100%',
        maxWidth: '250px',
        margin: '20px auto 0 auto',
        padding: '10px 20px',
        borderRadius: '99em',
        fontSize: '20px',
        color: theme.palette.common.white,
        backgroundImage: ({ type }: IStyleProps) => {
            return (type === 'User')
                ? 'linear-gradient(to right, #a78ef6, #b364f4)'
                : (type === 'Agency') ? 'linear-gradient(to right, #0289e1, #01d6b6 100%);' : 'linear-gradient(to right, #a78ef6, #b364f4)'
        }
    },
    autoTop: {
        marginTop: 'auto'
    }
}));
const PriceItem = ({ type = 'User', data }: Props) => {
    const { t, lang } = useTranslation();
    const classes = useStyles({ topic: data.topic, type, lang });
    return (
        <div className={classes.item}>
            {
                data.topic
                    ? <Typography variant={"body1"} component={'div'} align={"center"}
                        className={classes.topic}>
                        {t('adsvantage:Most popular')}
                    </Typography>
                    : null
            }
            <Box display={'flex'} flexDirection={'column'} className={classes.itemInner}>
                <div className={classes.row}>
                    <Typography variant={"h5"} align={"center"} className={classes.projectName}>
                        {data.projectName}
                    </Typography>
                </div>
                <Divider classes={{ root: classes.divider }} />
                <div className={classes.row}>
                    <Typography variant={"body1"} align={"center"} className={classes.priceDesc}
                        dangerouslySetInnerHTML={{ __html: data.priceDesc }} />
                    <Typography component={'div'} align={"center"}>
                        {
                            data.pricePrefix
                                ?
                                <span className={classes.pricePrefix}>
                                    {data.pricePrefix}
                                </span>
                                :
                                null
                        }
                        <span className={classes.price}><span>NT$</span>{data.price}</span>
                        <span className={classes.priceUnit}>
                            {t('adsvantage:Per Month Tax excluded')}
                        </span>
                    </Typography>
                </div>
                <Divider classes={{ root: classes.divider }} />
                <div className={clsx(classes.row)}>
                    <ul className={classes.detailList}>
                        {
                            data.features.length
                                ?
                                data.features.map((feature: string) => {
                                    return (
                                        <li key={uuidv4()}>
                                            <Typography variant={"body1"} align={"center"}
                                                dangerouslySetInnerHTML={{ __html: feature }} />
                                        </li>
                                    )
                                })
                                : null
                        }
                    </ul>
                </div>
                <Divider classes={{ root: classes.divider }} className={classes.autoTop} />
                <div className={classes.row}>
                    <Typography variant={"body1"} align={"center"}>
                        {data.type}
                    </Typography>
                </div>
                <Divider classes={{ root: classes.divider }} />
                <div className={clsx(classes.row)}>
                    <ul className={classes.detailList}>
                        {
                            data.accountFeatures.length
                                ?
                                data.accountFeatures.map((feature: string) => {
                                    return (
                                        <li key={uuidv4()}>
                                            <Typography variant={"body1"} align={"center"}
                                                dangerouslySetInnerHTML={
                                                    { __html: feature.length ? feature : `<span>&nbsp;</span>` }
                                                } />
                                        </li>
                                    )
                                })
                                : null
                        }
                    </ul>
                    <Button variant={"contained"} href={data.linkUrl} target={'_blank'} className={classes.link}>
                        {data.linkText}
                    </Button>
                </div>
            </Box>
        </div>
    );
};
export default PriceItem;
