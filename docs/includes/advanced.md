# Advanced Features

SmartyJS comes with advanced features to allow its users to configure Smarty to their preferences. However, using these advanced features may not be for everybody. If you err on the side of caution or aren't really familiar with using similar features for other plugins, we suggest leaving the default settings in place, but if you're a bit more savvy with the way of the web, feel free to deploy your own personal touch across your instance of SmartyJS. Below are some of the possible configurations that can be made.

## Configurations

The bulk of SmartyJS has been made configurable through an extensive set of user settings. These settings control everything from the HTML tags to be used when writing Smarty markup to the sizing and spacing of Smarty activities at deployment. SmartyJS is configurable in two ways:

1. Configurations of its **JS**, which controls the initialization of SmartyJS
2. Configurations of its **CSS**, which controls the styling of SmartyJS
    
In many instances, JS and CSS configurations are reflective of one another. This means that certain configurations made to either Smarty's JS or CSS will also require that identical changes be made to Smarty's CSS or JS, respecitively, as well. For more information on how to set user preferences for SmartyJS, a complete outline of Smarty's configurable settings is provided below:

### JS Settings

Smarty's JS can be configured by setting the plugin's options according to user preferences. By default, SmartyJS is setup and invoked at document ready using its default configurations. To change this, you can either modify the existing invocation of SmartyJS on document ready within its JS file, or you can remove the existing invocation of Smarty altogether and reinvoke SmartyJS with your preferred settings somewhere else within your site. User preferences should be declared within your initial invocation of Smarty as follows:

```html
$.smarty({
    ...insert user settings here...
})
```

User configurations include:

<table cellspacing="2" cellpadding="2">
    <tr align="left">
        <th colspan="2">Configuration</th>
        <th width="15%">Options</th>
        <th width="15%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td colspan="2">window</td>
        <td>parent.window<br>
            window</td>
        <td>parent.window</td>
        <td>Identifies the window object equivalent to the browser window. By default, *parent.window* is used to capture instances where Smarty may be running from within an `<iframe>` on a learning management system (LMS).</td>
    </tr>
    <tr valign="top">
        <td colspan="2">selectorPrefix</td>
        <td>*string*-</td>
        <td>smarty-</td>
        <td>Defines the HTML tag prefix used for Smarty elements. If using a custom *string*, the prefix **must** end in a "-" in order to adhere to proper syntax rules. Do note, if changing this configuration in Smarty's JS, the cooresponding CSS configuration will also need to be modified. This will also affect the HTML markup of your Smarty elements.</td>
    </tr>
    <tr valign="top">
        <td colspan="2">focusClass</td>
        <td>*string*</td>
        <td>tabfocus</td>
        <td>Defines the class to be given to a tabbable element when the element is in focus. By default, a class called *tabfocus* is used. This class is primarily intended to allow you to style elements that are in focus.</td>
    </tr>
    <tr valign="top">
        <td colspan="2">className</td>
        <td>*string*</td>
        <td>smarty</td>
        <td>Defines the class to be given to Smarty elements. This class is only applied to the outermost Smarty element, such as a `<smarty-quiz>` or `<smarty-crossword>`.</td>
    </tr>
    <tr valign="top">
        <td colspan="2">transitionSpeed</td>
        <td>*seconds*</td>
        <td>0.25</td>
        <td>Defines the speed at which transitions and/or animations take place. An acceptable value should be in a *seconds* format without the "s" suffix added. Do note, changing this JS value requires that the equivalent transitionSpeed configuration be set in Smarty's CSS as well.</td>
    </tr>
    <tr valign="top">
        <td rowspan="10" width="15%">crosswords</td>
        <td width="15%">enabled</td>
        <td>true<br>
            false</td>
        <td>true</td>
        <td>Determines whether or not crosswords can be used. If set to *true*, crosswords are enabled. If set to *false*, crosswords are disabled.</td>
    </tr>
    <tr valign="top">
        <td>selector</td>
        <td>*string*</td>
        <td>crossword</td>
        <td>Defines the base HTML tag used for crosswords. This value is prefixed with the value set in selectorPrefix.</td>
    </tr>
    <tr valign="top">
        <td>name</td>
        <td>*string*</td>
        <td>crossword</td>
        <td>Defines the text name given to crosswords. This value outputs as text to the end user where applicable.</td>
    </tr>
    <tr valign="top">
        <td>fontResize</td>
        <td>true<br>
            false</td>
        <td>true</td>
        <td>Determines whether or not font size should be resized based on the crossword grid's width. If set to *true*, small fonts will only be resized on large screens while small screens will default to the crossword's original font size. If set to *false*, the crossword will always use its default font size.</td>
    </tr>
    <tr valign="top">
        <td>fontRatio</td>
        <td>*numeric*</td>
        <td>700 / 11</td>
        <td>Defines the ratio used in font resizing, which requires that fontResize be set to *true*. The *numeric* value provided is used to scale the crossword's font size relative to its grid's width.</td>
    </tr>
    <tr valign="top">
        <td>minWidth</td>
        <td>*numeric*</td>
        <td>20</td>
        <td>Sets the minimum acceptable font size for cells within the crossword grid. Do note, this *numeric* value should be equivalent to the `min-width` CSS value assigned to `.grid td`.</td>
    </tr>
    <tr valign="top">
        <td>cellSpacing</td>
        <td>*integer*</td>
        <td>2</td>
        <td>Sets the spacing between cells in the crossword grid.</td>
    </tr>
    <tr valign="top">
        <td>cellPadding</td>
        <td>*integer*</td>
        <td>2</td>
        <td>Sets the padding inside cells in the crossword grid.</td>
    </tr>
    <tr valign="top">
        <td>acceptJSON</td>
        <td>true<br>
            false</td>
        <td>true</td>
        <td>Determines whether or not JSON data files should be accepted for loading crossword data. Setting this to *true* enables you to use both HTML and JSON crossword data at the same time where your JSON data is loaded on page load. Setting this to *false* will help improve the performance of your Smarty application slightly since it skip the check for JSON data.</td>
    </tr>
    <tr valign="top">
        <td>acceptXML</td>
        <td>true<br>
            false</td>
        <td>true</td>
        <td>Determines whether or not XML data files should be accepted for loading crossword data. Setting this to *true* enables you to use both HTML and XML crossword data at the same time where your XML data is loaded on page load. Setting this to *false* will help improve the performance of your Smarty application slightly since it will skip the check fr XML data.</td>
    </tr>
    <tr valign="top">
        <td rowspan="9" width="15%">flashcards</td>
        <td width="15%">enabled</td>
        <td>true<br>
            false</td>
        <td>true</td>
        <td>Determines whether or not flashcards can be used. If set to *true*, flashcards are enabled. If set to *false*, flashcards are disabled.</td>
    </tr>
    <tr valign="top">
        <td>selector</td>
        <td>*string*</td>
        <td>flashcard</td>
        <td>Defines the base HTML tag used for flashcards. This value is prefixed with the value set in selectorPrefix.</td>
    </tr>
    <tr valign="top">
        <td>name</td>
        <td>*string*</td>
        <td>flashcards</td>
        <td>Defines the text name given to flashcards. This value outputs as text to the end user where applicable.</td>
    </tr>
    <tr valign="top">
        <td>aspectRatio</td>
        <td>*numeric*</td>
        <td>3 / 5</td>
        <td>Defines the aspect ratio of each card. This *numeric* value is used to set the height of the card relative to its width.</td>
    </tr>
    <tr valign="top">
        <td>fontResize</td>
        <td>true<br>
            false</td>
        <td>true</td>
        <td>Determines whether or not font size should be resized based on the flashcard's card width. If set to *true*, small fonts will only be resized on large screens while small screens will default to the card's original font size. If set to *false*, the card will always use its default font size.</td>
    </tr>
    <tr valign="top">
        <td>fontRatio</td>
        <td>*numeric*</td>
        <td>400 / 16</td>
        <td>Defines the ratio used in font resizing, which requires that fontResize be set to *true* and a respondAt value be set. The *numeric* value provided is used to scale the card's font size relative to its flashcard width.</td>
    </tr>
    <tr valign="top">
        <td>respondAt</td>
        <td>*numeric*</td>
        <td>400</td>
        <td>Defines the minimum width of a flashcard before font resizing will take place. If the flashcard's width is less than this *numeric* value, then the card's font size will default to its original size. If the flashcard's width is greater than or equal to this *numeric* value and fontResize is set to *true*, then font resizing will occur.</td>
    </tr>
    <tr valign="top">
        <td>acceptJSON</td>
        <td>true<br>
            false</td>
        <td>true</td>
        <td>Determines whether or not JSON data files should be accepted for loading flashcard data. Setting this to *true* enables you to use both HTML and JSON flashcard data at the same time where your JSON data is loaded on page load. Setting this to *false* will help improve the performance of your Smarty application slightly since it skip the check for JSON data.</td>
    </tr>
    <tr valign="top">
        <td>acceptXML</td>
        <td>true<br>
            false</td>
        <td>true</td>
        <td>Determines whether or not XML data files should be accepted for loading flashcard data. Setting this to *true* enables you to use both HTML and XML flashcard data at the same time where your XML data is loaded on page load. Setting this to *false* will help improve the performance of your Smarty application slightly since it will skip the check fr XML data.</td>
    </tr>
    <tr valign="top">
        <td rowspan="8" width="15%" class="radius-bottom-left">quizzes</td>
        <td width="15%">enabled</td>
        <td>true<br>
            false</td>
        <td>true</td>
        <td>Determines whether or not quizzes can be used. If set to *true*, quizzes are enabled. If set to *false*, quizzes are disabled.</td>
    </tr>
    <tr valign="top">
        <td>selector</td>
        <td>*string*</td>
        <td>quiz</td>
        <td>Defines the base HTML tag used for quizzes. This value is prefixed with the value set in selectorPrefix.</td>
    </tr>
    <tr valign="top">
        <td>name</td>
        <td>*string*</td>
        <td>quiz</td>
        <td>Defines the text name given to quizzes. This value outputs as text to the end user where applicable.</td>
    </tr>
    <tr valign="top">
        <td>respondAt</td>
        <td>*numeric*</td>
        <td>600</td>
        <td>Defines the minimum width of a quiz before responsive styles are implemented. Do note, if changes are made to this JS configuration, then equivalent changes will need to be made to the quiz breakpoint CSS configuration.</td>
    </tr>
    <tr valign="top">
        <td>fontResize</td>
        <td>true<br>
            false</td>
        <td>true</td>
        <td>Determines whether or not font size should be resized based on the flashcard's card width. If set to *true*, small fonts will only be resized on large screens while small screens will default to the card's original font size. If set to *false*, the card will always use its default font size.</td>
    </tr>
    <tr valign="top">
        <td>defaultMode</td>
        <td>sliding<br>
            streamline</td>
        <td>sliding</td>
        <td>Defines the default mode used for all quizzes when a quiz's `data-mode` attribute was not set.</td>
    </tr>
    <tr valign="top">
        <td>acceptJSON</td>
        <td>true<br>
            false</td>
        <td>true</td>
        <td>Determines whether or not JSON data files should be accepted for loading quiz data. Setting this to *true* enables you to use both HTML and JSON quiz data at the same time where your JSON data is loaded on page load. Setting this to *false* will help improve the performance of your Smarty application slightly since it skip the check for JSON data.</td>
    </tr>
    <tr valign="top">
        <td>acceptXML</td>
        <td>true<br>
            false</td>
        <td>true</td>
        <td>Determines whether or not XML data files should be accepted for loading quiz data. Setting this to *true* enables you to use both HTML and XML quiz data at the same time where your XML data is loaded on page load. Setting this to *false* will help improve the performance of your Smarty application slightly since it will skip the check fr XML data.</td>
    </tr>
</table>

### CSS Settings

To work around CSS limitations, Smarty was originally built on [SASS][SASS]. Thus, a special SCSS configuration file is included within the SmartyJS package to help make configuring Smarty's CSS easier. Do note that while using SASS to preprocess Smarty's CSS configurations can make the process much less painful, it's not a requisite that SASS be used. Although, configuring Smarty's CSS file directly will definitely be much harder than simply using [SASS][SASS]. Thus, we recommended that any CSS changes be made by using the following steps:

1. If not already setup, get [SASS][SASS] now. 
    - Install it on your machine, and learn the basics of using SASS in production.
2. Open the `_config.scss` file found in the SmartyJS SCSS folder in your preferred text or code editor.
3. Make any necessary changes according to the configurable settings shown below:

    <style>
        .colorblock{
            display: inline-block;
            border: 1px solid black;
            width: 50px;
            height: 1em;
            vertical-align: bottom;
            margin: 5px 5px 0px;
        }
    </style>

    <table width="100%" cellspacing="2" cellpadding="2">
        <tr align="left">
            <th colspan="2">Configuration</th>
            <th width="15%">Default</th>
            <th width="55%">Description</th>
        </tr>
        <tr valign="top">
            <td rowspan="5" width="15%">$selectors</td>
            <td width="15%">prefix</td>
            <td>smarty-</td>
            <td>This value should be equivalent to the selectorPrefix above in Smarty's JS configurations.</td>
        </tr>
        <tr valign="top">
            <td width="15%">class</td>
            <td>smarty</td>
            <td>This value should be equivalent to the className above in Smarty's JS configurations.</td>
        </tr>
        <tr valign="top">
            <td width="15%">crossword</td>
            <td>crossword</td>
            <td>This value should be equivalent to crosswords.selector above in Smarty's JS configurations.</td>
        </tr>
        <tr valign="top">
            <td width="15%">flashcard</td>
            <td>flashcard</td>
            <td>This value should be equivalent to flashcards.selector above in Smarty's JS configurations.</td>
        </tr>
        <tr valign="top">
            <td width="15%">quiz</td>
            <td>quiz</td>
            <td>This value should be equivalent to quizzes.selector above in Smarty's JS configurations.</td>
        </tr>
        <tr valign="top">
            <td colspan="2">$scheme</td>
            <td>default</td>
            <td>This value is set to the name of a color scheme, which contains five (5) colors. A `$schemes` map is used to allow you to create an infinite number of five-color color schemes from which you can choose your preferred `$scheme` from. The *default* color scheme consists of:
                <ol>
                    <li>`#BDD5EA` 
                    <span class="colorblock" style="background: #BDD5EA;"></span></li>
                    <li>`#495867`
                    <span class="colorblock" style="background: #495867;"></span></li>
                    <li>`#F7F7F7`
                    <span class="colorblock" style="background: #F7F7F7;"></span></li>
                    <li>`#2B9EB3`
                    <span class="colorblock" style="background: #2B9EB3;"></span></li>
                    <li>`#FE5F55`
                    <span class="colorblock" style="background: #FE5F55;"></span></li>
                </ol></td>
        </tr>
        <tr valign="top">
            <td colspan="2">$dark</td>
            <td>#333333</td>
            <td>This color is used for dark text over light backgrounds or for accenting as needed. By default, `#333333` <span class="colorblock" style="background: #333333;"></span> is used.</td>
        </tr>
        <tr valign="top">
            <td colspan="2">$light</td>
            <td>#FFFFFF</td>
            <td>This color is used for light text over dark backgrounds or for accenting as needed. By default, `#FFFFFF` <span class="colorblock" style="background: #FFFFFF;"></span> is used.</td>
        </tr>
        <tr valign="top">
            <td colspan="2">$pass</td>
            <td>#399E5A</td>
            <td>This color is used for emphasis. By default, `#399E5A` <span class="colorblock" style="background: #399E5A;"></span> is used.</td>
        </tr>
        <tr valign="top">
            <td colspan="2">$incomplete</td>
            <td>#FFBA08</td>
            <td>This color is used for emphasis. By default, `#FFBA08` <span class="colorblock" style="background: #FFBA08;"></span> is used.</td>
        </tr>
        <tr valign="top">
            <td colspan="2">$partial</td>
            <td>#FFBA08</td>
            <td>This color is used for emphasis. By default, `#FFBA08` <span class="colorblock" style="background: #FFBA08;"></span> is used.</td>
        </tr>
        <tr valign="top">
            <td colspan="2">$fail</td>
            <td>#D00000</td>
            <td>This color is used for emphasis. By default, `#D00000` <span class="colorblock" style="background: #D00000;"></span> is used.</td>
        </tr>
        <tr valign="top">
            <td colspan="2">$warning</td>
            <td>#D00000</td>
            <td>This color is used for emphasis. By default, `#D00000` <span class="colorblock" style="background: #D00000;"></span> is used.</td>
        </tr>
        <tr valign="top">
            <td colspan="2">$highlight</td>
            <td>#FFBA08</td>
            <td>This color is used for highlighting words within the crossword grid. Do note, the color is lightened and made semi-transparent when applied. By default, `#FFBA08` <span class="colorblock" style="background: #FFBA08;"></span> is used.</td>
        </tr>
        <tr valign="top">
            <td colspan="2">$transitionSpeed</td>
            <td>0.25s</td>
            <td>This value should be equivalent to the transitionSpeed above in Smarty's JS configurations. Do note, this value should be suffixed with "s" whereas the JS configuration should not.</td>
        </tr>
        <tr valign="top">
            <td>$breakpoints</td>
            <td>quiz</td>
            <td>600px</td>
            <td>This value should be equivalent to quizzes.respondAt above in Smarty's JS configurations. Do note, this value should be suffixed with "px" whereas the JS configuration should not.</td>
        </tr>
    </table>
    
4. When done making changes, recompile your main SASS file:
    - You should recompile the `smarty.scss` file, outputting it as `smarty.css`.
    
5. Optionally, you can minify your CSS file if preferred.
    - If you're not familiar with minifying CSS files, simply skip this step altogether. If you're feeling experimental, our preferred CSS minifier is [UglifyCSS][UglifyCSS].
    
6. Relink your new CSS file to your site, and enjoy!

[SASS]: http://sass-lang.com "Syntactically Awesome Style Sheets (SASS)"
[UglifyCSS]: https://github.com/fmarcia/UglifyCSS "A CSS Compressor for NodeJS"

    