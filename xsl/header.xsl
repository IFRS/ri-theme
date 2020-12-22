<xsl:stylesheet xmlns:i18n="http://apache.org/cocoon/i18n/2.1"
    xmlns:dri="http://di.tamu.edu/DRI/1.0/"
    xmlns:mets="http://www.loc.gov/METS/"
    xmlns:xlink="http://www.w3.org/TR/xlink/"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:dim="http://www.dspace.org/xmlns/dspace/dim"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:mods="http://www.loc.gov/mods/v3"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns="http://www.w3.org/1999/xhtml"
    exclude-result-prefixes="i18n dri mets xlink xsl dim xhtml mods dc">

    <xsl:output indent="yes"/>

    <xsl:template name="buildHeader">
        <div id="ds-header">
            <a id="ds-header-link">
                <xsl:attribute name="href">
                    <xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='contextPath'][not(@qualifier)]"/>
                    <xsl:text>/</xsl:text>
                </xsl:attribute>
                <img src="{concat($theme-path, '/images/ri-ifrs.png')}" alt="Página Inicial" class="img-fluid"/>
            </a>

            <xsl:choose>
                <xsl:when test="/dri:document/dri:meta/dri:userMeta/@authenticated = 'yes'">
                    <div id="ds-user-box">
                        <a id="ds-user-profile" class="btn btn-sm btn-info">
                            <xsl:attribute name="href">
                                <xsl:value-of select="/dri:document/dri:meta/dri:userMeta/
                                    dri:metadata[@element='identifier' and @qualifier='url']"/>
                            </xsl:attribute>
                            <xsl:value-of select="/dri:document/dri:meta/dri:userMeta/
                                dri:metadata[@element='identifier' and @qualifier='firstName']"/>
                            <xsl:text> </xsl:text>
                            <xsl:value-of select="/dri:document/dri:meta/dri:userMeta/
                                dri:metadata[@element='identifier' and @qualifier='lastName']"/>
                        </a>
                        <a id="ds-user-logout" class="btn btn-sm btn-danger">
                            <xsl:attribute name="href">
                                <xsl:value-of select="/dri:document/dri:meta/dri:userMeta/
                                    dri:metadata[@element='identifier' and @qualifier='logoutURL']"/>
                            </xsl:attribute>
                            <i18n:text>xmlui.dri2xhtml.structural.logout</i18n:text>
                        </a>
                    </div>
                </xsl:when>
                <xsl:otherwise>
                    <div id="ds-user-box">
                        <a id="ds-user-login" class="btn btn-sm btn-success">
                            <xsl:attribute name="href">
                                <xsl:value-of select="/dri:document/dri:meta/dri:userMeta/
                                    dri:metadata[@element='identifier' and @qualifier='loginURL']"/>
                            </xsl:attribute>
                            <i18n:text>xmlui.dri2xhtml.structural.login</i18n:text>
                        </a>
                    </div>
                </xsl:otherwise>
            </xsl:choose>

            <xsl:call-template name="languageSelection"/>

            <ul id="ds-trail">
                <xsl:choose>
                    <xsl:when test="starts-with($request-uri, 'page/about')">
                        <xsl:text>About This Repository</xsl:text>
                    </xsl:when>
                    <xsl:when test="count(/dri:document/dri:meta/dri:pageMeta/dri:trail) = 0">
                            <li class="ds-trail-link first-link"> - </li>
                    </xsl:when>
                    <xsl:otherwise>
                            <xsl:apply-templates select="/dri:document/dri:meta/dri:pageMeta/dri:trail"/>
                    </xsl:otherwise>
                </xsl:choose>
            </ul>
        </div>
    </xsl:template>
</xsl:stylesheet>
