import React, { useEffect, useState } from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import NavLink from "./links/NavLink";
import AddIcon from '@material-ui/icons/Add';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
// @ts-ignore
import detectBrowserLanguage from 'detect-browser-language';
import useTranslation from "next-translate/useTranslation";

const useStyles = makeStyles((theme: Theme) => ({
    alert: {
        position: 'fixed',
        width: '180px',
        height: '60px',
        padding: '10px',
        bottom: '20px',
        left: '50%',
        transform: 'translate(-90px, 0)',
        borderRadius: '99em',
        backgroundColor: theme.palette.common.black,
        zIndex: 30,
        cursor: 'pointer',
        overflow: 'hidden',
        transformOrigin: 'center center',
        transition: theme.transitions.create(['width', 'height', 'left', 'bottom', 'transform'], {
            easing: theme.transitions.easing.easeOut,
            duration: '0.5s'
        }),
        [theme.breakpoints.up('sm')]: {
            width: '200px',
            bottom: '40px',
            left: 'auto',
            right: '20px',
            transform: 'translate(0, 0)',
            transition: theme.transitions.create(['width', 'height'], {
                easing: theme.transitions.easing.easeOut,
                duration: '0.5s'
            })
        }
    },
    inner: {
        width: '100%',
        height: '100%'
    },
    active: {
        width: '100vw',
        height: '400px',
        padding: '40px 20px',
        left: 0,
        bottom: 0,
        transform: 'translate(0, 0)',
        borderRadius: 0,
        pointerEvents: 'none',
        transition: theme.transitions.create(['width', 'height', 'left', 'bottom', 'transform'], {
            easing: theme.transitions.easing.easeOut,
            duration: '0.7s'
        }),
        [theme.breakpoints.up('sm')]: {
            width: '440px',
            height: '380px',
            left: 'auto',
            bottom: '40px',
            padding: '30px 36px',
            transition: theme.transitions.create(['width', 'height'], {
                easing: theme.transitions.easing.easeOut,
                duration: '0.7s'
            })
        },
        '& $icon': {
            display: 'none'
        },
        '& $title': {
            fontSize: theme.typography.pxToRem(24),
            fontWeight: 700,
            lineHeight: 1,
            textAlign: 'left'
        },
        '& $contentWrapper': {
            position: 'relative',
            opacity: 1,
            transition: theme.transitions.create(['opacity'], {
                easing: theme.transitions.easing.easeOut,
                duration: '0.5s'
            }),
            transitionDelay: '0.7s'
        },
        '& $divider': {
            width: '100%'
        },
        '& $desc': {
            opacity: 1
        },
        '& $close': {
            pointerEvents: 'all',
            opacity: 1,
            transition: theme.transitions.create(['opacity'], {
                easing: theme.transitions.easing.easeOut,
                duration: '0.5s'
            }),
            transitionDelay: '0.7s'
        }
    },
    icon: {
        display: 'block',
        flex: '0 0 40px',
        width: '40px',
        // marginRight: '20px'
    },
    titleWrapper: {
        width: '100%',
        pointerEvents: 'none'
    },
    title: {
        flex: '1 1 auto',
        fontSize: theme.typography.pxToRem(16),
        color: theme.palette.common.white,
        textAlign: 'center'
    },
    contentWrapper: {
        position: 'absolute',
        flex: '1 1 auto',
        opacity: 0,
    },
    divider: {
        width: 0,
        margin: '20px 0 15px 0',
        backgroundColor: theme.palette.common.white,
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.easeOut,
            duration: '0.5s'
        }),
        transitionDelay: '1s'
    },
    desc: {
        opacity: 0,
        color: theme.palette.common.white
    },
    buttonList: {
        marginTop: 'auto'
    },
    button: {
        fontSize: theme.typography.pxToRem(16),
        color: theme.palette.common.white,
        textAlign: 'center',
        padding: '15px',
        width: '100%',
        backgroundColor: theme.palette.secondary.main,
        pointerEvents: 'all',
        '&:hover': {
            color: theme.palette.common.white,
            textDecoration: 'none'
        }
    },
    close: {
        position: 'absolute',
        width: '44px',
        minWidth: 'auto',
        height: '44px',
        padding: 0,
        top: 0,
        right: 0,
        borderRadius: 0,
        color: theme.palette.common.white,
        pointerEvents: 'none',
        opacity: 0,
        backgroundColor: theme.palette.common.black,
        '& svg': {
            transform: 'rotate(45deg)',
            transformOrigin: 'center center'
        }
    }
}));
const ContactAlert = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [tel, setTel] = useState('');
    const smUp = useMediaQuery(useTheme().breakpoints.up('sm'));
    const handleOpen = () => {
        setIsOpen(true)
    };
    const handleClose = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsOpen(false)
    };
    useEffect(() => {
        const currentTel = (detectBrowserLanguage() === 'zh-TW') ? '+886227576077' : '+85234810068';
        setTel(currentTel);
    }, []);
    return (
        <div className={clsx(classes.alert, (isOpen) ? classes.active : null)} onClick={handleOpen}>
            <Box display={'flex'} flexDirection={'column'} className={classes.inner}>
                <Box display={'flex'} alignItems={'center'} className={classes.titleWrapper}>
                    <img src="/images/icons/questions.png" className={classes.icon} />
                    <Typography variant={"body1"} component={'div'} align={"center"} className={classes.title}>
                        {t('common:Questions？')}
                    </Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} className={classes.contentWrapper}>
                    <Divider className={classes.divider} />
                    <Typography variant={"body1"} className={classes.desc} dangerouslySetInnerHTML={{
                        __html: t('common:No problem We can help you__')
                    }} />
                    <Grid container spacing={smUp ? 2 : 1} className={classes.buttonList}>
                        <Grid item xs={6} sm={6}>
                            <NavLink hrefPath={`tel:${tel}`} fullWidth isLaunch={true} classNames={classes.button}>
                                {t("common:Widget Let's Chat")}
                            </NavLink>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <NavLink hrefPath={'/contact'} fullWidth isLaunch={false} classNames={classes.button}>
                                {t("common:Contact Us")}
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Button onClick={handleClose} className={classes.close}>
                <AddIcon />
            </Button>
        </div>
    );
};
export default ContactAlert;
