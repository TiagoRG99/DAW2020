<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:template match="/">
        <xsl:result-document href="arqsite/index.html">
            <html>
                <head>
                    <title>Arquivo de Arqueossítios do NW Português</title>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <body>
                    <div style="padding:30px; text-align: center; background: black; color: white;">
                        <h1>Arquivo de Arqueossítios do NW Português</h1>
                    </div>
                    <div style="padding:5px; text-align: center; background: grey; color: white;">
                        <h3>Índice de Arqueossítios</h3>
                    </div>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI"/>
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <!-- Templates de Índice ............................... -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- Templates para o Conteúdo ......................... -->
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="arqsite/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <body>
                    <div style="padding:15px; text-align: center; background: black; color: white;">
                        <h1><b><xsl:value-of select="IDENTI"/></b></h1>
                    </div>
                    
                    <div style="text-align: justify;">
                        <xsl:apply-templates select="TIPO"/>
                        <xsl:apply-templates select="IMAGEM"/>
                        <xsl:apply-templates select="DESCRI"/>
                        <xsl:apply-templates select="CRONO"/>
                        <xsl:apply-templates select="LUGAR"/>
                        <xsl:apply-templates select="FREGUE"/>
                        <xsl:apply-templates select="CONCEL"/>
                        <xsl:apply-templates select="CODADM"/>
                        <xsl:apply-templates select="LATITU"/>
                        <xsl:apply-templates select="LONGIT"/>
                        <xsl:apply-templates select="ALTITU"/>
                        <xsl:apply-templates select="ACESSO"/>
                        <xsl:apply-templates select="QUADRO"/>
                        <xsl:apply-templates select="TRAARQ"/>
                        <xsl:apply-templates select="DESARQ"/>
                        <xsl:apply-templates select="INTERP"/>
                        <xsl:apply-templates select="DEPOSI"/>
                        <xsl:apply-templates select="INTERE"/>
                        <xsl:apply-templates select="BIBLIO"/>
                        <xsl:apply-templates select="AUTOR"/>
                        <xsl:apply-templates select="DATA"/>
                    </div>
                    <div class="w3-bar">
                        <button class="w3-bar-item w3-button w3-black" style="width:33.3%">
                            <address style="text-align: center;">
                                [<a href="{generate-id()}.html">Anterior</a>]
                            </address>
                        </button>
                        <button class="w3-bar-item w3-button w3-black" style="width:33.3%">
                            <address style="text-align: center;">
                                [<a href="index.html#i{generate-id()}">Voltar à Página Principal</a>]
                            </address>
                        </button>
                        <button class="w3-bar-item w3-button w3-black" style="width:33.3%">
                            <address style="text-align: center;">
                                [<a href="{generate-id()}.html">Próximo</a>]
                            </address>
                        </button>
                    </div>
                </body>
            </html>
        </xsl:result-document>
        
    </xsl:template>
    
    <xsl:template match="TIPO">
        <p><b>Tipo: </b> <xsl:value-of select="./@ASSUNTO"/></p>
    </xsl:template>
    
    <xsl:template match="IMAGEM">
        <p><b>Imagem: </b> <xsl:value-of select="./@NOME"/></p>
    </xsl:template>
    
    <xsl:template match="DESCRI">
        <p><b>Descrição: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="CRONO">
        <p><b>Crono: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="LUGAR">
        <p><b>Lugar: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="FREGUE">
        <p><b>Freguesia: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="CONCEL">
        <p><b>Concelho: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="CODADM">
        <p><b>CodaDM: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="LATITU">
        <p><b>Latitude: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="LONGIT">
        <p><b>Longitude: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="ALTITU">
        <p><b>Altitude: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="ACESSO">
        <p><b>Acesso: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="QUADRO">
        <p><b>Quadro: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="TRAARQ">
        <p><b>Traarq: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="DESARQ">
        <p><b>Desarq: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="INTERP">
        <p><b>Interp: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="DEPOSI">
        <p><b>Deposi: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="INTERE">
        <p><b>Intere: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="BIBLIO">
        <p><b>Biblio: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="AUTOR">
        <p><b>Autor: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="DATA">
        <p><b>Data: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
</xsl:stylesheet>