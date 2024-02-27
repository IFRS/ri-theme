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

    <xsl:template name="buildFooter">
        <div id="ds-footer">
            <div id="ds-footer-logo">
                <a href="https://ifrs.edu.br/" data-toggle="tooltip" data-placement="top" title="Portal do IFRS">
                    <img src="{concat($theme-path, '/images/ifrs.png')}" alt="Portal do IFRS"/>
                </a>
            </div>
            <div id="ds-footer-links">
                <a id="ds-footer-links-sibifrs" href="https://ifrs.edu.br/ensino/bibliotecas/repositorio-institucional/" data-toggle="tooltip" data-placement="top" title="Sistema de Bibliotecas do IFRS">
                    <img src="{concat($theme-path, '/images/sibifrs.png')}" alt="Sistema de Bibliotecas do IFRS - SIBIFRS"/>
                </a>
                <a>
                    <xsl:attribute name="href">
                        <xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='contextPath'][not(@qualifier)]"/>
                        <xsl:text>/contact</xsl:text>
                    </xsl:attribute>
                    <i18n:text>xmlui.dri2xhtml.structural.contact-link</i18n:text>
                </a>
                <xsl:text> | </xsl:text>
                <a>
                    <xsl:attribute name="href">
                        <xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='contextPath'][not(@qualifier)]"/>
                        <xsl:text>/feedback</xsl:text>
                    </xsl:attribute>
                    <i18n:text>xmlui.dri2xhtml.structural.feedback-link</i18n:text>
                </a>
            </div>
            <div id="ds-footer-credits">
                    <!-- DSpace -->
                <a href="https://duraspace.org/dspace/" target="_blank" rel="noopener noreferrer" data-toggle="tooltip" data-placement="top" title="Desenvolvido com DSpace">
                    <img src="{concat($theme-path, '/images/creditos-dspace.png')}" alt="Desenvolvido com DSpace (abre uma nova página)"/>
                </a>
                <!-- Código-fonte -->
                <a href="https://github.com/IFRS/ri-theme/" target="_blank" rel="noopener noreferrer" data-toggle="tooltip" data-placement="top" title="Código-fonte deste tema">
                    <img src="{concat($theme-path, '/images/creditos-git.png')}" alt="Código-fonte deste tema (abre uma nova página)"/>
                </a>
            </div>
        </div>
    </xsl:template>
</xsl:stylesheet>
