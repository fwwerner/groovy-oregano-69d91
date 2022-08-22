import React from 'react';
import {Helmet} from 'react-helmet';
import _ from 'lodash';

import {withPrefix, attribute} from '../utils';
import Announcement from './Announcement';
import Header from './Header';
import Footer from './Footer';

export default class Body extends React.Component {
    render() {
        let style = _.get(this.props, 'data.config.style', null) || 'classic';
        let font = _.get(this.props, 'data.config.base_font', null) || 'sans-serif';
        return (
            <React.Fragment>
                <Helmet>
                    <title>{_.get(this.props, 'page.seo.title', null) ? (_.get(this.props, 'page.seo.title', null)) : _.get(this.props, 'page.title', null) + ' | ' + _.get(this.props, 'data.config.title', null)}</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="google" content="notranslate" />
                    <meta name="description" content={_.get(this.props, 'page.seo.description', null) || ''} />
                    {_.get(this.props, 'page.seo.robots', null) && (
                    <meta name="robots" content={_.join(_.get(this.props, 'page.seo.robots', null), ',')}/>
                    )}
                    {_.map(_.get(this.props, 'page.seo.extra', null), (meta, meta_idx) => {
                        let key_name = _.get(meta, 'keyName', null) || 'name';
                        return (
                          _.get(meta, 'relativeUrl', null) ? (
                            _.get(this.props, 'data.config.domain', null) && ((() => {
                                let domain = _.trim(_.get(this.props, 'data.config.domain', null), '/');
                                let rel_url = withPrefix(_.get(meta, 'value', null));
                                let full_url = domain + rel_url;
                                return (
                                  <meta key={meta_idx} {...(attribute(key_name, _.get(meta, 'name', null)))} content={full_url}/>
                                );
                            })())
                          ) : 
                            <meta key={meta_idx + '.1'} {...(attribute(key_name, _.get(meta, 'name', null)))} content={_.get(meta, 'value', null)}/>
                        )
                    })}
                    <link rel="preload" type="font/woff2" href="/fonts/open-sans-v34-latin/open-sans-v34-latin-regular.woff2" />
                    {_.get(this.props, 'data.config.favicon', null) && (
                    <link rel="icon" href={withPrefix(_.get(this.props, 'data.config.favicon', null))}/>
                    )}
                    <body className={'layout-' + _.get(this.props, 'data.config.layout_type', null) + ' style-' + _.get(this.props, 'data.config.style', null) + ' palette-' + _.get(this.props, 'data.config.palette', null) + ' mode-' + _.get(this.props, 'data.config.mode', null) + ' font-' + _.get(this.props, 'data.config.base_font', null)} />
                </Helmet>
                <div id="site-wrap" className="site">
                	{(_.get(this.props, 'data.config.header.has_anncmnt', null) && _.get(this.props, 'data.config.header.anncmnt_content', null)) && (
                		_.get(this.props, 'data.config.header.anncmnt_is_home_only', null) ? (
                			(_.get(this.props, 'page.stackbit_url_path', null) === '/') && (
                				<Announcement {...this.props} site={this.props} />
                			)
                		) : 
                			<Announcement {...this.props} site={this.props} />
                	)}
                	<Header {...this.props} />
                	<main id="content" className="site-content">
                		{this.props.children}
                	</main>
                	<Footer {...this.props} />
                </div>
                {(_.get(this.props, 'data.config.header.has_primary_nav', null) || _.get(this.props, 'data.config.header.has_secondary_nav', null)) && (
                <div className="nav-overlay js-nav-toggle" />
                )}
            </React.Fragment>
        );
    }
}
