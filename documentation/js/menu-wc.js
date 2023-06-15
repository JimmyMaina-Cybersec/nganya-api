'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nganya-apis documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-c7ea569f4e53160ccf5f95f2aab31298112d2b5334a8c03f3838678579d26a2b32993322b4e849fd72fe9c7b5af290a69922c4a4c59cab4526c438ad493fc108"' : 'data-bs-target="#xs-controllers-links-module-AppModule-c7ea569f4e53160ccf5f95f2aab31298112d2b5334a8c03f3838678579d26a2b32993322b4e849fd72fe9c7b5af290a69922c4a4c59cab4526c438ad493fc108"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-c7ea569f4e53160ccf5f95f2aab31298112d2b5334a8c03f3838678579d26a2b32993322b4e849fd72fe9c7b5af290a69922c4a4c59cab4526c438ad493fc108"' :
                                            'id="xs-controllers-links-module-AppModule-c7ea569f4e53160ccf5f95f2aab31298112d2b5334a8c03f3838678579d26a2b32993322b4e849fd72fe9c7b5af290a69922c4a4c59cab4526c438ad493fc108"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-c7ea569f4e53160ccf5f95f2aab31298112d2b5334a8c03f3838678579d26a2b32993322b4e849fd72fe9c7b5af290a69922c4a4c59cab4526c438ad493fc108"' : 'data-bs-target="#xs-injectables-links-module-AppModule-c7ea569f4e53160ccf5f95f2aab31298112d2b5334a8c03f3838678579d26a2b32993322b4e849fd72fe9c7b5af290a69922c4a4c59cab4526c438ad493fc108"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-c7ea569f4e53160ccf5f95f2aab31298112d2b5334a8c03f3838678579d26a2b32993322b4e849fd72fe9c7b5af290a69922c4a4c59cab4526c438ad493fc108"' :
                                        'id="xs-injectables-links-module-AppModule-c7ea569f4e53160ccf5f95f2aab31298112d2b5334a8c03f3838678579d26a2b32993322b4e849fd72fe9c7b5af290a69922c4a4c59cab4526c438ad493fc108"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-887416d8704a5fcbc7e3f631a50a6c9a88e19bfdd0f528f56a7ad91f7d5d60700cef3e772a12cad49ac917a7f85325fe18b560c228c2a91b6a11848c248b1c66"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-887416d8704a5fcbc7e3f631a50a6c9a88e19bfdd0f528f56a7ad91f7d5d60700cef3e772a12cad49ac917a7f85325fe18b560c228c2a91b6a11848c248b1c66"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-887416d8704a5fcbc7e3f631a50a6c9a88e19bfdd0f528f56a7ad91f7d5d60700cef3e772a12cad49ac917a7f85325fe18b560c228c2a91b6a11848c248b1c66"' :
                                            'id="xs-controllers-links-module-AuthModule-887416d8704a5fcbc7e3f631a50a6c9a88e19bfdd0f528f56a7ad91f7d5d60700cef3e772a12cad49ac917a7f85325fe18b560c228c2a91b6a11848c248b1c66"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-887416d8704a5fcbc7e3f631a50a6c9a88e19bfdd0f528f56a7ad91f7d5d60700cef3e772a12cad49ac917a7f85325fe18b560c228c2a91b6a11848c248b1c66"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-887416d8704a5fcbc7e3f631a50a6c9a88e19bfdd0f528f56a7ad91f7d5d60700cef3e772a12cad49ac917a7f85325fe18b560c228c2a91b6a11848c248b1c66"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-887416d8704a5fcbc7e3f631a50a6c9a88e19bfdd0f528f56a7ad91f7d5d60700cef3e772a12cad49ac917a7f85325fe18b560c228c2a91b6a11848c248b1c66"' :
                                        'id="xs-injectables-links-module-AuthModule-887416d8704a5fcbc7e3f631a50a6c9a88e19bfdd0f528f56a7ad91f7d5d60700cef3e772a12cad49ac917a7f85325fe18b560c228c2a91b6a11848c248b1c66"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AvailabilitiesModule.html" data-type="entity-link" >AvailabilitiesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AvailabilitiesModule-8f4c938dbdd5d47710f1f1f06198eb39962336c7b9364b6fd1b8059cb66014fcac8274058c5bc668494ff769d7037726f1d1d21e3d849eea01ff7517d45867e8"' : 'data-bs-target="#xs-controllers-links-module-AvailabilitiesModule-8f4c938dbdd5d47710f1f1f06198eb39962336c7b9364b6fd1b8059cb66014fcac8274058c5bc668494ff769d7037726f1d1d21e3d849eea01ff7517d45867e8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AvailabilitiesModule-8f4c938dbdd5d47710f1f1f06198eb39962336c7b9364b6fd1b8059cb66014fcac8274058c5bc668494ff769d7037726f1d1d21e3d849eea01ff7517d45867e8"' :
                                            'id="xs-controllers-links-module-AvailabilitiesModule-8f4c938dbdd5d47710f1f1f06198eb39962336c7b9364b6fd1b8059cb66014fcac8274058c5bc668494ff769d7037726f1d1d21e3d849eea01ff7517d45867e8"' }>
                                            <li class="link">
                                                <a href="controllers/AvailabilitiesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AvailabilitiesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AvailabilitiesModule-8f4c938dbdd5d47710f1f1f06198eb39962336c7b9364b6fd1b8059cb66014fcac8274058c5bc668494ff769d7037726f1d1d21e3d849eea01ff7517d45867e8"' : 'data-bs-target="#xs-injectables-links-module-AvailabilitiesModule-8f4c938dbdd5d47710f1f1f06198eb39962336c7b9364b6fd1b8059cb66014fcac8274058c5bc668494ff769d7037726f1d1d21e3d849eea01ff7517d45867e8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AvailabilitiesModule-8f4c938dbdd5d47710f1f1f06198eb39962336c7b9364b6fd1b8059cb66014fcac8274058c5bc668494ff769d7037726f1d1d21e3d849eea01ff7517d45867e8"' :
                                        'id="xs-injectables-links-module-AvailabilitiesModule-8f4c938dbdd5d47710f1f1f06198eb39962336c7b9364b6fd1b8059cb66014fcac8274058c5bc668494ff769d7037726f1d1d21e3d849eea01ff7517d45867e8"' }>
                                        <li class="link">
                                            <a href="injectables/AvailabilitiesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AvailabilitiesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BookingModule.html" data-type="entity-link" >BookingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BookingModule-2f558dae0f8de664a1bdf4072ce5079f05aa15343810c4301b73d2d3331fda93483082a0a49a8e981e8ba112eb0fd363d96cc9d837c7ddcfd2bfc850cdc2e686"' : 'data-bs-target="#xs-injectables-links-module-BookingModule-2f558dae0f8de664a1bdf4072ce5079f05aa15343810c4301b73d2d3331fda93483082a0a49a8e981e8ba112eb0fd363d96cc9d837c7ddcfd2bfc850cdc2e686"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BookingModule-2f558dae0f8de664a1bdf4072ce5079f05aa15343810c4301b73d2d3331fda93483082a0a49a8e981e8ba112eb0fd363d96cc9d837c7ddcfd2bfc850cdc2e686"' :
                                        'id="xs-injectables-links-module-BookingModule-2f558dae0f8de664a1bdf4072ce5079f05aa15343810c4301b73d2d3331fda93483082a0a49a8e981e8ba112eb0fd363d96cc9d837c7ddcfd2bfc850cdc2e686"' }>
                                        <li class="link">
                                            <a href="injectables/BookingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatModule.html" data-type="entity-link" >ChatModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ChatModule-6cd1b56618b0430b2a78a7019c341a5c1d228768685c693670255b4b637fd095f6056ce3e7ba0be39920c7e9ad4cecb2550376fd94f747b315c00427459dd33b"' : 'data-bs-target="#xs-controllers-links-module-ChatModule-6cd1b56618b0430b2a78a7019c341a5c1d228768685c693670255b4b637fd095f6056ce3e7ba0be39920c7e9ad4cecb2550376fd94f747b315c00427459dd33b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ChatModule-6cd1b56618b0430b2a78a7019c341a5c1d228768685c693670255b4b637fd095f6056ce3e7ba0be39920c7e9ad4cecb2550376fd94f747b315c00427459dd33b"' :
                                            'id="xs-controllers-links-module-ChatModule-6cd1b56618b0430b2a78a7019c341a5c1d228768685c693670255b4b637fd095f6056ce3e7ba0be39920c7e9ad4cecb2550376fd94f747b315c00427459dd33b"' }>
                                            <li class="link">
                                                <a href="controllers/ChatController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ChatModule-6cd1b56618b0430b2a78a7019c341a5c1d228768685c693670255b4b637fd095f6056ce3e7ba0be39920c7e9ad4cecb2550376fd94f747b315c00427459dd33b"' : 'data-bs-target="#xs-injectables-links-module-ChatModule-6cd1b56618b0430b2a78a7019c341a5c1d228768685c693670255b4b637fd095f6056ce3e7ba0be39920c7e9ad4cecb2550376fd94f747b315c00427459dd33b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChatModule-6cd1b56618b0430b2a78a7019c341a5c1d228768685c693670255b4b637fd095f6056ce3e7ba0be39920c7e9ad4cecb2550376fd94f747b315c00427459dd33b"' :
                                        'id="xs-injectables-links-module-ChatModule-6cd1b56618b0430b2a78a7019c341a5c1d228768685c693670255b4b637fd095f6056ce3e7ba0be39920c7e9ad4cecb2550376fd94f747b315c00427459dd33b"' }>
                                        <li class="link">
                                            <a href="injectables/ChatService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LipaNaMpesaModule.html" data-type="entity-link" >LipaNaMpesaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LipaNaMpesaModule-631a648cd8daa480b14bc8eedeb71e349a2f8ad6c41eee31eb453a07006703995cb4720850c7bbf18dfaa1fb161c15faed92977a454280f72588ad04c43d6e8d"' : 'data-bs-target="#xs-controllers-links-module-LipaNaMpesaModule-631a648cd8daa480b14bc8eedeb71e349a2f8ad6c41eee31eb453a07006703995cb4720850c7bbf18dfaa1fb161c15faed92977a454280f72588ad04c43d6e8d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LipaNaMpesaModule-631a648cd8daa480b14bc8eedeb71e349a2f8ad6c41eee31eb453a07006703995cb4720850c7bbf18dfaa1fb161c15faed92977a454280f72588ad04c43d6e8d"' :
                                            'id="xs-controllers-links-module-LipaNaMpesaModule-631a648cd8daa480b14bc8eedeb71e349a2f8ad6c41eee31eb453a07006703995cb4720850c7bbf18dfaa1fb161c15faed92977a454280f72588ad04c43d6e8d"' }>
                                            <li class="link">
                                                <a href="controllers/LipaNaMpesaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LipaNaMpesaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LipaNaMpesaModule-631a648cd8daa480b14bc8eedeb71e349a2f8ad6c41eee31eb453a07006703995cb4720850c7bbf18dfaa1fb161c15faed92977a454280f72588ad04c43d6e8d"' : 'data-bs-target="#xs-injectables-links-module-LipaNaMpesaModule-631a648cd8daa480b14bc8eedeb71e349a2f8ad6c41eee31eb453a07006703995cb4720850c7bbf18dfaa1fb161c15faed92977a454280f72588ad04c43d6e8d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LipaNaMpesaModule-631a648cd8daa480b14bc8eedeb71e349a2f8ad6c41eee31eb453a07006703995cb4720850c7bbf18dfaa1fb161c15faed92977a454280f72588ad04c43d6e8d"' :
                                        'id="xs-injectables-links-module-LipaNaMpesaModule-631a648cd8daa480b14bc8eedeb71e349a2f8ad6c41eee31eb453a07006703995cb4720850c7bbf18dfaa1fb161c15faed92977a454280f72588ad04c43d6e8d"' }>
                                        <li class="link">
                                            <a href="injectables/LipaNaMpesaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LipaNaMpesaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationsModule.html" data-type="entity-link" >NotificationsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NotificationsModule-4e4210244a50384678b4891dd4fb11d3ea44a03b073fb78a512878268a627baf430236861aaf4c9ce942c592f0d40b5107c87ae172391d2c408d2d9d700e9be8"' : 'data-bs-target="#xs-injectables-links-module-NotificationsModule-4e4210244a50384678b4891dd4fb11d3ea44a03b073fb78a512878268a627baf430236861aaf4c9ce942c592f0d40b5107c87ae172391d2c408d2d9d700e9be8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NotificationsModule-4e4210244a50384678b4891dd4fb11d3ea44a03b073fb78a512878268a627baf430236861aaf4c9ce942c592f0d40b5107c87ae172391d2c408d2d9d700e9be8"' :
                                        'id="xs-injectables-links-module-NotificationsModule-4e4210244a50384678b4891dd4fb11d3ea44a03b073fb78a512878268a627baf430236861aaf4c9ce942c592f0d40b5107c87ae172391d2c408d2d9d700e9be8"' }>
                                        <li class="link">
                                            <a href="injectables/NotificationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PercelModule.html" data-type="entity-link" >PercelModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PercelModule-3a6bc73d8dd3edeea7974957e2b9efdf214569f180f41fdf65f4556c5daae15caa8d096cfaf4b480626ecf79fea8b882ba8a418916cb5dbd801b3e5486ab0c70"' : 'data-bs-target="#xs-controllers-links-module-PercelModule-3a6bc73d8dd3edeea7974957e2b9efdf214569f180f41fdf65f4556c5daae15caa8d096cfaf4b480626ecf79fea8b882ba8a418916cb5dbd801b3e5486ab0c70"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PercelModule-3a6bc73d8dd3edeea7974957e2b9efdf214569f180f41fdf65f4556c5daae15caa8d096cfaf4b480626ecf79fea8b882ba8a418916cb5dbd801b3e5486ab0c70"' :
                                            'id="xs-controllers-links-module-PercelModule-3a6bc73d8dd3edeea7974957e2b9efdf214569f180f41fdf65f4556c5daae15caa8d096cfaf4b480626ecf79fea8b882ba8a418916cb5dbd801b3e5486ab0c70"' }>
                                            <li class="link">
                                                <a href="controllers/PercelController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PercelController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PercelModule-3a6bc73d8dd3edeea7974957e2b9efdf214569f180f41fdf65f4556c5daae15caa8d096cfaf4b480626ecf79fea8b882ba8a418916cb5dbd801b3e5486ab0c70"' : 'data-bs-target="#xs-injectables-links-module-PercelModule-3a6bc73d8dd3edeea7974957e2b9efdf214569f180f41fdf65f4556c5daae15caa8d096cfaf4b480626ecf79fea8b882ba8a418916cb5dbd801b3e5486ab0c70"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PercelModule-3a6bc73d8dd3edeea7974957e2b9efdf214569f180f41fdf65f4556c5daae15caa8d096cfaf4b480626ecf79fea8b882ba8a418916cb5dbd801b3e5486ab0c70"' :
                                        'id="xs-injectables-links-module-PercelModule-3a6bc73d8dd3edeea7974957e2b9efdf214569f180f41fdf65f4556c5daae15caa8d096cfaf4b480626ecf79fea8b882ba8a418916cb5dbd801b3e5486ab0c70"' }>
                                        <li class="link">
                                            <a href="injectables/PercelService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PercelService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PresenceModule.html" data-type="entity-link" >PresenceModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PresenceModule-64de591ae876d4896765d05e18a0dde0cdf6450efc11b2321fb78e1ac80d592057025a33d2ed71cad0ab60531c0db268c85c17902ca58ee79ff4c2f91f96d02a"' : 'data-bs-target="#xs-injectables-links-module-PresenceModule-64de591ae876d4896765d05e18a0dde0cdf6450efc11b2321fb78e1ac80d592057025a33d2ed71cad0ab60531c0db268c85c17902ca58ee79ff4c2f91f96d02a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PresenceModule-64de591ae876d4896765d05e18a0dde0cdf6450efc11b2321fb78e1ac80d592057025a33d2ed71cad0ab60531c0db268c85c17902ca58ee79ff4c2f91f96d02a"' :
                                        'id="xs-injectables-links-module-PresenceModule-64de591ae876d4896765d05e18a0dde0cdf6450efc11b2321fb78e1ac80d592057025a33d2ed71cad0ab60531c0db268c85c17902ca58ee79ff4c2f91f96d02a"' }>
                                        <li class="link">
                                            <a href="injectables/PresenceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PresenceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link" >ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProfileModule-d083cd3e5530d5c96ffee2fa375ab588d7d1204a647ee50fae1ed4d963ec91b533872efc0b0b452bfeba7cdd1dd9e67f313f72d10c36b42d0db3f2109f8ecf3a"' : 'data-bs-target="#xs-controllers-links-module-ProfileModule-d083cd3e5530d5c96ffee2fa375ab588d7d1204a647ee50fae1ed4d963ec91b533872efc0b0b452bfeba7cdd1dd9e67f313f72d10c36b42d0db3f2109f8ecf3a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProfileModule-d083cd3e5530d5c96ffee2fa375ab588d7d1204a647ee50fae1ed4d963ec91b533872efc0b0b452bfeba7cdd1dd9e67f313f72d10c36b42d0db3f2109f8ecf3a"' :
                                            'id="xs-controllers-links-module-ProfileModule-d083cd3e5530d5c96ffee2fa375ab588d7d1204a647ee50fae1ed4d963ec91b533872efc0b0b452bfeba7cdd1dd9e67f313f72d10c36b42d0db3f2109f8ecf3a"' }>
                                            <li class="link">
                                                <a href="controllers/ProfileController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProfileModule-d083cd3e5530d5c96ffee2fa375ab588d7d1204a647ee50fae1ed4d963ec91b533872efc0b0b452bfeba7cdd1dd9e67f313f72d10c36b42d0db3f2109f8ecf3a"' : 'data-bs-target="#xs-injectables-links-module-ProfileModule-d083cd3e5530d5c96ffee2fa375ab588d7d1204a647ee50fae1ed4d963ec91b533872efc0b0b452bfeba7cdd1dd9e67f313f72d10c36b42d0db3f2109f8ecf3a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProfileModule-d083cd3e5530d5c96ffee2fa375ab588d7d1204a647ee50fae1ed4d963ec91b533872efc0b0b452bfeba7cdd1dd9e67f313f72d10c36b42d0db3f2109f8ecf3a"' :
                                        'id="xs-injectables-links-module-ProfileModule-d083cd3e5530d5c96ffee2fa375ab588d7d1204a647ee50fae1ed4d963ec91b533872efc0b0b452bfeba7cdd1dd9e67f313f72d10c36b42d0db3f2109f8ecf3a"' }>
                                        <li class="link">
                                            <a href="injectables/ProfileService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoutesModule.html" data-type="entity-link" >RoutesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RoutesModule-f69cb4720eda673f769bb75dc65ec5a28850709e4e013dc44b52508293ded6614402d3e2557eb6930eae4e551d95cb07d622fdfb980c7459956202f467b6e00c"' : 'data-bs-target="#xs-controllers-links-module-RoutesModule-f69cb4720eda673f769bb75dc65ec5a28850709e4e013dc44b52508293ded6614402d3e2557eb6930eae4e551d95cb07d622fdfb980c7459956202f467b6e00c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoutesModule-f69cb4720eda673f769bb75dc65ec5a28850709e4e013dc44b52508293ded6614402d3e2557eb6930eae4e551d95cb07d622fdfb980c7459956202f467b6e00c"' :
                                            'id="xs-controllers-links-module-RoutesModule-f69cb4720eda673f769bb75dc65ec5a28850709e4e013dc44b52508293ded6614402d3e2557eb6930eae4e551d95cb07d622fdfb980c7459956202f467b6e00c"' }>
                                            <li class="link">
                                                <a href="controllers/RoutesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoutesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RoutesModule-f69cb4720eda673f769bb75dc65ec5a28850709e4e013dc44b52508293ded6614402d3e2557eb6930eae4e551d95cb07d622fdfb980c7459956202f467b6e00c"' : 'data-bs-target="#xs-injectables-links-module-RoutesModule-f69cb4720eda673f769bb75dc65ec5a28850709e4e013dc44b52508293ded6614402d3e2557eb6930eae4e551d95cb07d622fdfb980c7459956202f467b6e00c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoutesModule-f69cb4720eda673f769bb75dc65ec5a28850709e4e013dc44b52508293ded6614402d3e2557eb6930eae4e551d95cb07d622fdfb980c7459956202f467b6e00c"' :
                                        'id="xs-injectables-links-module-RoutesModule-f69cb4720eda673f769bb75dc65ec5a28850709e4e013dc44b52508293ded6614402d3e2557eb6930eae4e551d95cb07d622fdfb980c7459956202f467b6e00c"' }>
                                        <li class="link">
                                            <a href="injectables/RoutesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoutesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SaccosModule.html" data-type="entity-link" >SaccosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SaccosModule-3a94ecb624afe2eb220aefecc0b39d70f70a48f3e7eb04d912b03a79e60e9f941c8640a39391120a9fd352e1dc6065bf1f10e643f3165adc7caad842e26c5e0b"' : 'data-bs-target="#xs-controllers-links-module-SaccosModule-3a94ecb624afe2eb220aefecc0b39d70f70a48f3e7eb04d912b03a79e60e9f941c8640a39391120a9fd352e1dc6065bf1f10e643f3165adc7caad842e26c5e0b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SaccosModule-3a94ecb624afe2eb220aefecc0b39d70f70a48f3e7eb04d912b03a79e60e9f941c8640a39391120a9fd352e1dc6065bf1f10e643f3165adc7caad842e26c5e0b"' :
                                            'id="xs-controllers-links-module-SaccosModule-3a94ecb624afe2eb220aefecc0b39d70f70a48f3e7eb04d912b03a79e60e9f941c8640a39391120a9fd352e1dc6065bf1f10e643f3165adc7caad842e26c5e0b"' }>
                                            <li class="link">
                                                <a href="controllers/SaccosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SaccosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SaccosModule-3a94ecb624afe2eb220aefecc0b39d70f70a48f3e7eb04d912b03a79e60e9f941c8640a39391120a9fd352e1dc6065bf1f10e643f3165adc7caad842e26c5e0b"' : 'data-bs-target="#xs-injectables-links-module-SaccosModule-3a94ecb624afe2eb220aefecc0b39d70f70a48f3e7eb04d912b03a79e60e9f941c8640a39391120a9fd352e1dc6065bf1f10e643f3165adc7caad842e26c5e0b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SaccosModule-3a94ecb624afe2eb220aefecc0b39d70f70a48f3e7eb04d912b03a79e60e9f941c8640a39391120a9fd352e1dc6065bf1f10e643f3165adc7caad842e26c5e0b"' :
                                        'id="xs-injectables-links-module-SaccosModule-3a94ecb624afe2eb220aefecc0b39d70f70a48f3e7eb04d912b03a79e60e9f941c8640a39391120a9fd352e1dc6065bf1f10e643f3165adc7caad842e26c5e0b"' }>
                                        <li class="link">
                                            <a href="injectables/SaccosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SaccosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StationsModule.html" data-type="entity-link" >StationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-StationsModule-d090cda881c00d2e3b0e1a315b015672d7a4852e61e3e48174407109a5ccbdd48de32bdedfdcfd84d65e8743de5a0a10c8c6dec4b8391342317f86495fa4e044"' : 'data-bs-target="#xs-controllers-links-module-StationsModule-d090cda881c00d2e3b0e1a315b015672d7a4852e61e3e48174407109a5ccbdd48de32bdedfdcfd84d65e8743de5a0a10c8c6dec4b8391342317f86495fa4e044"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StationsModule-d090cda881c00d2e3b0e1a315b015672d7a4852e61e3e48174407109a5ccbdd48de32bdedfdcfd84d65e8743de5a0a10c8c6dec4b8391342317f86495fa4e044"' :
                                            'id="xs-controllers-links-module-StationsModule-d090cda881c00d2e3b0e1a315b015672d7a4852e61e3e48174407109a5ccbdd48de32bdedfdcfd84d65e8743de5a0a10c8c6dec4b8391342317f86495fa4e044"' }>
                                            <li class="link">
                                                <a href="controllers/StationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-StationsModule-d090cda881c00d2e3b0e1a315b015672d7a4852e61e3e48174407109a5ccbdd48de32bdedfdcfd84d65e8743de5a0a10c8c6dec4b8391342317f86495fa4e044"' : 'data-bs-target="#xs-injectables-links-module-StationsModule-d090cda881c00d2e3b0e1a315b015672d7a4852e61e3e48174407109a5ccbdd48de32bdedfdcfd84d65e8743de5a0a10c8c6dec4b8391342317f86495fa4e044"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StationsModule-d090cda881c00d2e3b0e1a315b015672d7a4852e61e3e48174407109a5ccbdd48de32bdedfdcfd84d65e8743de5a0a10c8c6dec4b8391342317f86495fa4e044"' :
                                        'id="xs-injectables-links-module-StationsModule-d090cda881c00d2e3b0e1a315b015672d7a4852e61e3e48174407109a5ccbdd48de32bdedfdcfd84d65e8743de5a0a10c8c6dec4b8391342317f86495fa4e044"' }>
                                        <li class="link">
                                            <a href="injectables/StationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TicketModule.html" data-type="entity-link" >TicketModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TicketModule-0e1ee707fb188c17a69450853730e6a90943229641e70b72f74a37f8fb4249aba11ff0436008f344643bf600350258e4758fad8be79c581847d2c5881f41dd54"' : 'data-bs-target="#xs-controllers-links-module-TicketModule-0e1ee707fb188c17a69450853730e6a90943229641e70b72f74a37f8fb4249aba11ff0436008f344643bf600350258e4758fad8be79c581847d2c5881f41dd54"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TicketModule-0e1ee707fb188c17a69450853730e6a90943229641e70b72f74a37f8fb4249aba11ff0436008f344643bf600350258e4758fad8be79c581847d2c5881f41dd54"' :
                                            'id="xs-controllers-links-module-TicketModule-0e1ee707fb188c17a69450853730e6a90943229641e70b72f74a37f8fb4249aba11ff0436008f344643bf600350258e4758fad8be79c581847d2c5881f41dd54"' }>
                                            <li class="link">
                                                <a href="controllers/TicketController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TicketController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TicketModule-0e1ee707fb188c17a69450853730e6a90943229641e70b72f74a37f8fb4249aba11ff0436008f344643bf600350258e4758fad8be79c581847d2c5881f41dd54"' : 'data-bs-target="#xs-injectables-links-module-TicketModule-0e1ee707fb188c17a69450853730e6a90943229641e70b72f74a37f8fb4249aba11ff0436008f344643bf600350258e4758fad8be79c581847d2c5881f41dd54"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TicketModule-0e1ee707fb188c17a69450853730e6a90943229641e70b72f74a37f8fb4249aba11ff0436008f344643bf600350258e4758fad8be79c581847d2c5881f41dd54"' :
                                        'id="xs-injectables-links-module-TicketModule-0e1ee707fb188c17a69450853730e6a90943229641e70b72f74a37f8fb4249aba11ff0436008f344643bf600350258e4758fad8be79c581847d2c5881f41dd54"' }>
                                        <li class="link">
                                            <a href="injectables/TicketService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TicketService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-07a8cedd44fe0ee99310795ca1b91b5ecf10689ac4e15ae2bf3660d92af594daed17f1a2775333092efbb025953f7ea4e25415f2bfde4a2b37549a6ff81112bc"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-07a8cedd44fe0ee99310795ca1b91b5ecf10689ac4e15ae2bf3660d92af594daed17f1a2775333092efbb025953f7ea4e25415f2bfde4a2b37549a6ff81112bc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-07a8cedd44fe0ee99310795ca1b91b5ecf10689ac4e15ae2bf3660d92af594daed17f1a2775333092efbb025953f7ea4e25415f2bfde4a2b37549a6ff81112bc"' :
                                            'id="xs-controllers-links-module-UsersModule-07a8cedd44fe0ee99310795ca1b91b5ecf10689ac4e15ae2bf3660d92af594daed17f1a2775333092efbb025953f7ea4e25415f2bfde4a2b37549a6ff81112bc"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-07a8cedd44fe0ee99310795ca1b91b5ecf10689ac4e15ae2bf3660d92af594daed17f1a2775333092efbb025953f7ea4e25415f2bfde4a2b37549a6ff81112bc"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-07a8cedd44fe0ee99310795ca1b91b5ecf10689ac4e15ae2bf3660d92af594daed17f1a2775333092efbb025953f7ea4e25415f2bfde4a2b37549a6ff81112bc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-07a8cedd44fe0ee99310795ca1b91b5ecf10689ac4e15ae2bf3660d92af594daed17f1a2775333092efbb025953f7ea4e25415f2bfde4a2b37549a6ff81112bc"' :
                                        'id="xs-injectables-links-module-UsersModule-07a8cedd44fe0ee99310795ca1b91b5ecf10689ac4e15ae2bf3660d92af594daed17f1a2775333092efbb025953f7ea4e25415f2bfde4a2b37549a6ff81112bc"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/VehicleOwnersModule.html" data-type="entity-link" >VehicleOwnersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-VehicleOwnersModule-c9b0931431e92df1d8ae49e4f62086af604be10cfbc274fafa3a98bd13e845266ccb208c1d959d0450587c5efe0b5f606cb494a55c69123cfd57a4d8cfc277ec"' : 'data-bs-target="#xs-controllers-links-module-VehicleOwnersModule-c9b0931431e92df1d8ae49e4f62086af604be10cfbc274fafa3a98bd13e845266ccb208c1d959d0450587c5efe0b5f606cb494a55c69123cfd57a4d8cfc277ec"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-VehicleOwnersModule-c9b0931431e92df1d8ae49e4f62086af604be10cfbc274fafa3a98bd13e845266ccb208c1d959d0450587c5efe0b5f606cb494a55c69123cfd57a4d8cfc277ec"' :
                                            'id="xs-controllers-links-module-VehicleOwnersModule-c9b0931431e92df1d8ae49e4f62086af604be10cfbc274fafa3a98bd13e845266ccb208c1d959d0450587c5efe0b5f606cb494a55c69123cfd57a4d8cfc277ec"' }>
                                            <li class="link">
                                                <a href="controllers/VehicleOwnersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VehicleOwnersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-VehicleOwnersModule-c9b0931431e92df1d8ae49e4f62086af604be10cfbc274fafa3a98bd13e845266ccb208c1d959d0450587c5efe0b5f606cb494a55c69123cfd57a4d8cfc277ec"' : 'data-bs-target="#xs-injectables-links-module-VehicleOwnersModule-c9b0931431e92df1d8ae49e4f62086af604be10cfbc274fafa3a98bd13e845266ccb208c1d959d0450587c5efe0b5f606cb494a55c69123cfd57a4d8cfc277ec"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VehicleOwnersModule-c9b0931431e92df1d8ae49e4f62086af604be10cfbc274fafa3a98bd13e845266ccb208c1d959d0450587c5efe0b5f606cb494a55c69123cfd57a4d8cfc277ec"' :
                                        'id="xs-injectables-links-module-VehicleOwnersModule-c9b0931431e92df1d8ae49e4f62086af604be10cfbc274fafa3a98bd13e845266ccb208c1d959d0450587c5efe0b5f606cb494a55c69123cfd57a4d8cfc277ec"' }>
                                        <li class="link">
                                            <a href="injectables/VehicleOwnersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VehicleOwnersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/VehiclesModule.html" data-type="entity-link" >VehiclesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-VehiclesModule-34a1d719cee3e976209bcc6a2e33297fd8c7833fc69d5e318b2c217bbceae5357106a8922a927045ef9a5c055c4a67184b9fdcb62bec8e2995d1595e37365713"' : 'data-bs-target="#xs-controllers-links-module-VehiclesModule-34a1d719cee3e976209bcc6a2e33297fd8c7833fc69d5e318b2c217bbceae5357106a8922a927045ef9a5c055c4a67184b9fdcb62bec8e2995d1595e37365713"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-VehiclesModule-34a1d719cee3e976209bcc6a2e33297fd8c7833fc69d5e318b2c217bbceae5357106a8922a927045ef9a5c055c4a67184b9fdcb62bec8e2995d1595e37365713"' :
                                            'id="xs-controllers-links-module-VehiclesModule-34a1d719cee3e976209bcc6a2e33297fd8c7833fc69d5e318b2c217bbceae5357106a8922a927045ef9a5c055c4a67184b9fdcb62bec8e2995d1595e37365713"' }>
                                            <li class="link">
                                                <a href="controllers/VehiclesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VehiclesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-VehiclesModule-34a1d719cee3e976209bcc6a2e33297fd8c7833fc69d5e318b2c217bbceae5357106a8922a927045ef9a5c055c4a67184b9fdcb62bec8e2995d1595e37365713"' : 'data-bs-target="#xs-injectables-links-module-VehiclesModule-34a1d719cee3e976209bcc6a2e33297fd8c7833fc69d5e318b2c217bbceae5357106a8922a927045ef9a5c055c4a67184b9fdcb62bec8e2995d1595e37365713"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VehiclesModule-34a1d719cee3e976209bcc6a2e33297fd8c7833fc69d5e318b2c217bbceae5357106a8922a927045ef9a5c055c4a67184b9fdcb62bec8e2995d1595e37365713"' :
                                        'id="xs-injectables-links-module-VehiclesModule-34a1d719cee3e976209bcc6a2e33297fd8c7833fc69d5e318b2c217bbceae5357106a8922a927045ef9a5c055c4a67184b9fdcb62bec8e2995d1595e37365713"' }>
                                        <li class="link">
                                            <a href="injectables/VehiclesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VehiclesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/AvailabilitiesGateway.html" data-type="entity-link" >AvailabilitiesGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/Availability.html" data-type="entity-link" >Availability</a>
                            </li>
                            <li class="link">
                                <a href="classes/Availability-1.html" data-type="entity-link" >Availability</a>
                            </li>
                            <li class="link">
                                <a href="classes/Booking.html" data-type="entity-link" >Booking</a>
                            </li>
                            <li class="link">
                                <a href="classes/BookingGateway.html" data-type="entity-link" >BookingGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/Chat.html" data-type="entity-link" >Chat</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChatGateway.html" data-type="entity-link" >ChatGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthDto.html" data-type="entity-link" >CreateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAvailabilityDto.html" data-type="entity-link" >CreateAvailabilityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBookingDto.html" data-type="entity-link" >CreateBookingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateChatDto.html" data-type="entity-link" >CreateChatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNotificationDto.html" data-type="entity-link" >CreateNotificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePercelDto.html" data-type="entity-link" >CreatePercelDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePresenceDto.html" data-type="entity-link" >CreatePresenceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProfileDto.html" data-type="entity-link" >CreateProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRouteDto.html" data-type="entity-link" >CreateRouteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSaccoDto.html" data-type="entity-link" >CreateSaccoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateStationDto.html" data-type="entity-link" >CreateStationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTicketDto.html" data-type="entity-link" >CreateTicketDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateVehicleDto.html" data-type="entity-link" >CreateVehicleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateVehicleOwnerDto.html" data-type="entity-link" >CreateVehicleOwnerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Customer.html" data-type="entity-link" >Customer</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindStationAgentsDto.html" data-type="entity-link" >FindStationAgentsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/findUserByIdNoDTO.html" data-type="entity-link" >findUserByIdNoDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="classes/LipaDto.html" data-type="entity-link" >LipaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LipaNaMpesaCallbackDto.html" data-type="entity-link" >LipaNaMpesaCallbackDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LipaNaMpesaGateway.html" data-type="entity-link" >LipaNaMpesaGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/LipaNaMpesaTransaction.html" data-type="entity-link" >LipaNaMpesaTransaction</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogoutDto.html" data-type="entity-link" >LogoutDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Notification.html" data-type="entity-link" >Notification</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotificationsGateway.html" data-type="entity-link" >NotificationsGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/Parcel.html" data-type="entity-link" >Parcel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Percel.html" data-type="entity-link" >Percel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/Presence.html" data-type="entity-link" >Presence</a>
                            </li>
                            <li class="link">
                                <a href="classes/PresenceGateway.html" data-type="entity-link" >PresenceGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/Route.html" data-type="entity-link" >Route</a>
                            </li>
                            <li class="link">
                                <a href="classes/Sacco.html" data-type="entity-link" >Sacco</a>
                            </li>
                            <li class="link">
                                <a href="classes/Station.html" data-type="entity-link" >Station</a>
                            </li>
                            <li class="link">
                                <a href="classes/StkInitResponce.html" data-type="entity-link" >StkInitResponce</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ticket.html" data-type="entity-link" >Ticket</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAvailabilityDto.html" data-type="entity-link" >UpdateAvailabilityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBookingDto.html" data-type="entity-link" >UpdateBookingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateChatDto.html" data-type="entity-link" >UpdateChatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDriverDto.html" data-type="entity-link" >UpdateDriverDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateNotificationDto.html" data-type="entity-link" >UpdateNotificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePercelDto.html" data-type="entity-link" >UpdatePercelDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePresenceDto.html" data-type="entity-link" >UpdatePresenceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProfileDto.html" data-type="entity-link" >UpdateProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRouteDto.html" data-type="entity-link" >UpdateRouteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSaccoDto.html" data-type="entity-link" >UpdateSaccoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStationDto.html" data-type="entity-link" >UpdateStationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTicketDto.html" data-type="entity-link" >UpdateTicketDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateVehicleDto.html" data-type="entity-link" >UpdateVehicleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateVehicleOwnerDto.html" data-type="entity-link" >UpdateVehicleOwnerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/Vehicle.html" data-type="entity-link" >Vehicle</a>
                            </li>
                            <li class="link">
                                <a href="classes/VehicleOwner.html" data-type="entity-link" >VehicleOwner</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtGuard.html" data-type="entity-link" >JwtGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});