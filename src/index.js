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
            new_folder: options.icons?.new_folder ?? import(`./components/icons/new_folder.svg`),
            new_file: options.icons?.new_file ?? import(`./components/icons/new_file.svg`),
            rename: options.icons?.rename ?? import(`./components/icons/rename.svg`),
            delete: options.icons?.delete ?? import(`./components/icons/delete.svg`),
            upload: options.icons?.upload ?? import(`./components/icons/upload.svg`),
            archive: options.icons?.archive ?? import(`./components/icons/archive.svg`),
            loading: options.icons?.loading ?? import(`./components/icons/loading.svg`),
            minimize: options.icons?.minimize ?? import(`./components/icons/minimize.svg`),
            full_screen: options.icons?.full_screen ?? import(`./components/icons/full_screen.svg`),
            grid_view: options.icons?.grid_view ?? import(`./components/icons/grid_view.svg`),
            list_view: options.icons?.list_view ?? import(`./components/icons/list_view.svg`),
            list_tree: options.icons?.list_tree ?? import(`./components/icons/list_tree.svg`),
            go_up: options.icons?.go_up ?? import(`./components/icons/go_up.svg`),
            home: options.icons?.home ?? import(`./components/icons/home.svg`),
            dots: options.icons?.dots ?? import(`./components/icons/dots.svg`),
            search: options.icons?.search ?? import(`./components/icons/search.svg`),
            exit: options.icons?.exit ?? import(`./components/icons/exit.svg`),
            folder: options.icons?.folder ?? import(`./components/icons/folder.svg`),
            file: options.icons?.file ?? import(`./components/icons/file.svg`),
            pin: options.icons?.pin ?? import(`./components/icons/pin.svg`),
            open_folder: options.icons?.open_folder ?? import(`./components/icons/open_folder.svg`),
            unarchive: options.icons?.unarchive ?? import(`./components/icons/unarchive.svg`),
            refresh: options.icons?.refresh ?? import(`./components/icons/refresh.svg`),
            close: options.icons?.close ?? import(`./components/icons/close.svg`),
            xbox: options.icons?.xbox ?? import(`./components/icons/x_box.svg`),
            square_plus: options.icons?.square_plus ?? import(`./components/icons/plus.svg`),
            square_minus: options.icons?.square_minus ?? import(`./components/icons/minus.svg`),
            drag: options.icons?.drag ?? import(`./components/icons/drag.svg`),
            storage: options.icons?.storage ?? import(`./components/icons/storage.svg`),
            about: options.icons?.about ?? import(`./components/icons/about.svg`),
        }

        // unique id for the app options
        app.provide('VueFinderOptions', options);

        // define main component
        app.component("VueFinder", VueFinder);
    }
};


