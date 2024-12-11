import VueFinder from './components/VueFinder.vue';
import './assets/css/style.scss';
import { menuItems, SimpleItem } from './utils/contextmenu';

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
            iconKey: null,
            customProps: {},
        };
        options.icons = {
            about: options.icons?.about ?? import(`./components/icons/about.svg`),
            archive: options.icons?.archive ?? import(`./components/icons/archive.svg`),
            asc: options.icons?.asc ?? import(`./components/icons/asc.svg`),
            close: options.icons?.close ?? import(`./components/icons/close.svg`),
            delete: options.icons?.delete ?? import(`./components/icons/delete.svg`),
            desc: options.icons?.desc ?? import(`./components/icons/desc.svg`),
            dots: options.icons?.dots ?? import(`./components/icons/dots.svg`),
            drag: options.icons?.drag ?? import(`./components/icons/drag.svg`),
            exit: options.icons?.exit ?? import(`./components/icons/exit.svg`),
            file: options.icons?.file ?? import(`./components/icons/file.svg`),
            folder: options.icons?.folder ?? import(`./components/icons/folder.svg`),
            full_screen: options.icons?.full_screen ?? import(`./components/icons/full_screen.svg`),
            go_up: options.icons?.go_up ?? import(`./components/icons/go_up.svg`),
            grid_view: options.icons?.grid_view ?? import(`./components/icons/grid_view.svg`),
            home: options.icons?.home ?? import(`./components/icons/home.svg`),
            loading: options.icons?.loading ?? import(`./components/icons/loading.svg`),
            list_tree: options.icons?.list_tree ?? import(`./components/icons/list_tree.svg`),
            list_view: options.icons?.list_view ?? import(`./components/icons/list_view.svg`),
            minimize: options.icons?.minimize ?? import(`./components/icons/minimize.svg`),
            minus: options.icons?.square_minus ?? import(`./components/icons/minus.svg`),
            new_file: options.icons?.new_file ?? import(`./components/icons/new_file.svg`),
            new_folder: options.icons?.new_folder ?? import(`./components/icons/new_folder.svg`),
            open_folder: options.icons?.open_folder ?? import(`./components/icons/open_folder.svg`),
            pin: options.icons?.pin ?? import(`./components/icons/pin.svg`),
            plus: options.icons?.square_plus ?? import(`./components/icons/plus.svg`),
            refresh: options.icons?.refresh ?? import(`./components/icons/refresh.svg`),
            rename: options.icons?.rename ?? import(`./components/icons/rename.svg`),
            search: options.icons?.search ?? import(`./components/icons/search.svg`),
            storage: options.icons?.storage ?? import(`./components/icons/storage.svg`),
            unarchive: options.icons?.unarchive ?? import(`./components/icons/unarchive.svg`),
            upload: options.icons?.upload ?? import(`./components/icons/upload.svg`),
            x_box: options.icons?.xbox ?? import(`./components/icons/x_box.svg`),
        }

        // unique id for the app options
        app.provide('VueFinderOptions', options);

        // define main component
        app.component("VueFinder", VueFinder);
    }
};

export {
    menuItems as contextMenuItems,
    SimpleItem as SimpleContextMenuItem,
}
