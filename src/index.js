import VueFinder from './components/VueFinder.vue';
import './assets/css/style.scss';

export default {
    /**
     * @param {import('vue').App} app
     * @param options
     */
    install(app, options = {}) {
        // define global properties with 'options'
        options.i18n = options.i18n ?? {};
        let [firstLanguage] = Object.keys(options.i18n)
        options.locale = options.locale ?? firstLanguage ?? 'en';
        options.iconComponent = options.iconComponent ?? {
            tag: 'svg',
            props: {},
        };
        options.icons = {
            refresh: options.icons?.refresh ?? import(`./components/icons/refresh.svg`),
        }

        // unique id for the app options
        app.provide('VueFinderOptions', options);

        // define main component
        app.component("VueFinder", VueFinder);
    }
};


