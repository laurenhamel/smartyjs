# Getting Started with SmartyJS

No need to be intimidated. Smarty was designed with educators in mind: In order to make Smarty easy to use for even the non-developer, Smarty only requires the minimum amount of HTML markup necessary in order to grasp whatever it is you're after.

The present version of SmartyJS (v1.0.0) offers three (3) types of interactive learning tools:

- <a href="#Quizzes">Quizzes</a>
- <a href="#Crosswords">Crosswords</a>
- <a href="#Flashcards">Flashcards</a>

To learn more about how to create each of the tools above, read through the following sections in depth for more details.


## Creating Quizzes <a id="Quizzes"></a>

Quizzes are interactive exercises that online learners can use to assess their knowledge of a given topic. In order to create a Smarty quiz, follow the steps below:

### 1. Initialize the Element

Start by creating a `<smarty-quiz>` element in your HTML document:

```html
<smarty-quiz></smarty-quiz>
```
   
### 2. Set Your Preferences

Set your quiz's attributes to correspond with your preferences:

<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>data-mode</td>
        <td>sliding<br>
            streamline</td>
        <td>sliding</td>
        <td>If set to *sliding*, the quiz will assume a sliding format with previous and next arrows for moving between questions. If set to *streamline*, the quiz will use a linear format with each question stacked on the page.</td>
    </tr>
    <tr valign="top">
        <td>data-shuffle-questions</td>
        <td>true<br>
            false</td>
        <td>false</td>
        <td>If set to *true*, the quiz's questions will be shuffled each time the quiz is loaded. If set to *false*, the quiz's questions will not be shuffled when the quiz loads, and questions will always remain in the same order.</td>
    </tr>
    <tr valign="top">
        <td>data-shuffle-answers</td>
        <td>true<br>
            false</td>
        <td>false</td>
        <td>If set to *true*, the answers for each quiz question will be shuffled. If set to *false*, the answers for each question will not be shuffled when the quiz loads, and answers will always remain in the same order.</td>
    </tr>
    <tr valign="top">
        <td>data-title</td>
        <td>*string*<br>
            *html*</td>
        <td>*null*</td>
        <td>By default, your quiz will not have a title until this attribute is declared with a *string* value. *HTML* values are also accepted.</td>
    </tr>
    <tr valign="top">
        <td>data-back</td>
        <td>true<br>
            false</td>
        <td>true</td>
        <td>Only applicable when `data-mode="sliding"`. If set to *true*, the user will be allowed to move from question to question both forward and backward. If set to *false*, the user will only be allowed to move forward through the quiz's questions.</td>
    </tr>
    <tr valign="top">
        <td>data-timed</td>
        <td>true<br>
            false<br>
            *(h)h:mm:ss*<br>
            *(m)m:ss*<br>
            *(s)s*</td>
        <td>false</td>
        <td>If set to *true*, a running timer is added to the quiz, which will time how long it takes the user to reach completion. If set to *false*, the user will not be timed. When set to a numerical value adhering to one of the valid time formats, including *(h)h:mm:ss*, *(m)m:ss*, and *(s)s* (where parenthetical values are optional), a maximum time limit is set, and a countdown timer is added to the quiz; when the countdown timer runs out, the user will no longer be able to submit answers.</td>
    </tr>
    <tr valign="top">
        <td>data-file</td>
        <td>*file*.json<br>
            *file*.xml</td>
        <td>*null*</td>
        <td>The `data-file` attribute can optionally be used to supply question and answer data. The attribute accepts only two types of file formats, including *JSON* and *XML*. In order to use a *JSON* file, the `acceptJSON` configuration for quizzes in Smarty's JS file must be set to *true*. In order to use an *XML* file, the `acceptXML` configuration for quizzes in Smarty's JS file must be set to *true*. For more information on using *JSON* and *XML* data files, see the various methods for adding questions and answers below.</td>
    </tr>
</table>
    
### 3. Create an Introduction

Create a `<smarty-intro>` element, and nest it inside your `<smarty-quiz>`:

```html
<smarty-quiz>
    <smarty-intro></smarty-intro>
</smarty-quiz>
```

Add any introductory content inside your newly created `<smarty-intro>` element:

```html
<smarty-intro>
    <p>This is a sample introduction...</p>
</smarty-intro>
```

An introduction is only **required** when the `data-timed` attribute has a value other than *false*. If `data-timed` is set to *false*, an introduction is **recommended** but not required.

### 4. Add Questions and Answers

A total of four (4) types of questions exist within a Smarty quiz:

- <a href="#MultiChoice">Multiple Choice</a>
- <a href="#MultiAnswer">Multiple Answer</a>
- <a href="#ShortAnswer">Short Answer</a>
- <a href="#TrueFalse">True/False</a>

Questions and answers can be added to a quiz through various methods:

1. Using HTML
2. Using JSON
3. Using XML

The JSON and XML approaches utilize external data files for storing question and answer data, which is then asynchronously loaded into the quiz when initialized. To specify a JSON or XML file, the `data-file` attribute described earlier is used on the quiz element. Both JSON and XML can be used in conjunction with the HTML approach. For more information on how to add questions and answers to quizzes using the various approaches described above, continue reading.

###### Using HTML

Any combination of the above question types can be added to a Smarty quiz in any given order. One thing all questions will have in common is their shared use of the `<smarty-question>` element:

```html
<smarty-quiz>
    <smarty-question></smarty-question>
</smarty-quiz>
```
To add text to a question, simply add question text directly to the element itself:

```html
<smarty-question>
    How's the weather?
</smarty-question>
```

###### Using JSON

For JSON data files, the general format is to use a JSON array made up of various  objects, where each object within the outermost JSON array is made up of question data. For most questions, the question object will look relatively similar with a few exceptions contingent upon the type of question being used. A general overview of how a JSON data file is formatted is shown below:

```json
[
    {
        "question": "How's the weather?"
    }
]
```

###### Using XML
Like JSON data files, XML data files also have their own formatting guidelines. The XML data structure closely resembles the HTML data structure mentioned above but with a slightly different style. A preview of what an XML data file would look like is given below:

```xml
    <quiz>
        <question>
            <question>How's the weather?</question>
        </question>
    </quiz>
```

Whether you're using HTML, JSON, or XML, it's important to note that each question type uses a slightly different configuration. For specific instructions regarding how to setup each of the four question types listed above, see the following for more details:


#### Multiple Choice Questions <a id="MultiChoice"></a>

Traditionally, multiple choice is among the most commonly used types of questions. A multiple choice question is one in which only one (1) correct answer exists within a given list of answer options. Thus, to create a multiple choice question, several answer options must be created for which only one (1) answer option is the correct answer.

##### 1. Start by creating a question and add in question text:

###### Using HTML

When using HTML, a question is created using the `<smarty-question>` element:

```html
<smarty-question>
    How many licks does it take to get to the center of a Tootsie Pop?
</smarty-question>
```

###### Using JSON

When using JSON, a question is created using object notation:

```json
{
    "question": "How many licks does it take to get to the center of a Tootsie Pop?"
}
```

###### Using XML

When using XML, a question is identified using a `<question>` element with a subsequent `<question>` element nested inside for holding the question's text:

```xml
<question>
    <question>How many licks does it take to get to the center of a Tootsie Pop?</question>
<question>
```
    
    
    
##### 2. Next, set the question's properties based on your preferences:

###### Using HTML

The HTML attributes are applied to the `<smarty-question>` element directly:

```html
<smarty-question data-points="1" data-attempts="infinite" data-id="HTML">
    How many licks does it take to get to the center of a Tootsie Pop?
</smarty-question>
```

<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>data-points</td>
        <td>*numeric*</td>
        <td>1</td>
        <td>Setting this attribute with a *numeric* value, such as an integer or decimal, will give the question some point value, which is factored into the quiz's running and final score. Do note, if all questions are worth 0 points, the quiz's resulting maximum possible score will always be 0%.</td>
    </tr>
    <tr valign="top">
        <td>data-attempts</td>
        <td>*integer*<br>
            infinite</td>
        <td>infinite</td>
        <td>Setting this attribute with an *integer*, or whole number, value will permit the user to only answer the given question up to the allotted number of times permitted or until the question is answered correctly, whichever comes first. Not setting this attribute is equivalent to setting its value to *infinite*, which allows the user to continuously attempt to answer the question until the correct answer is given.</td>
    </tr>
    <tr valign="top">
        <td>data-id</td>
        <td>*string*</td>
        <td>*null*</td>
        <td>Setting this attribute with a *string* will assign the element the given ID. The ID assigned to the element is not used for any special purpose and is mostly intended for use by developers. This property is optional.</td>
    </tr>
</table>
    
###### Using JSON
    
In JSON, the following properties are declared on a new line within the question object:
    
```json
{
    "question": "How many licks does it take to get to the center of a Tootsie Pop?",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON"
}
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>points</td>
        <td>*numeric*</td>
        <td>1</td>
        <td>Setting this property with a *numeric* value, such as an integer or decimal, will give the question some point value, which is factored into the quiz's running and final score. Do note, if all questions are worth 0 points, the quiz's resulting maximum possible score will always be 0%.</td>
    </tr>
    <tr valign="top">
        <td>attempts</td>
        <td>*integer*<br>
            infinite</td>
        <td>infinite</td>
        <td>Setting this property with an *integer*, or whole number, value will permit the user to only answer the given question up to the allotted number of times permitted or until the question is answered correctly, whichever comes first. Not setting this attribute is equivalent to setting its value to *infinite*, which allows the user to continuously attempt to answer the question until the correct answer is given.</td>
    </tr>
    <tr valign="top">
        <td>id</td>
        <td>*string*</td>
        <td>*null*</td>
        <td>Setting this property with a *string* will assign the element the given ID. The ID assigned to the element is not used for any special purpose and is mostly intended for use by developers. This property is optional.</td>
    </tr>
    <tr valign="top">
        <td>type</td>
        <td>multichoice<br>
            multianswer<br>
            shortanswer<br>
            truefalse</td>
        <td>*null*</td>
        <td>Setting this property with the relevant question type from the list of types provided will help improve the performance of your Smarty application. For multiple choice questions, use the *multichoice* question type. This property, however, is optional. If not set, the application will determine the question type automatically.</td>
    </tr>
</table>
    
###### Using XML
    
In XML, the following attributes can be added directly to the parent question element:
    
```xml
<question points="1" attempts="infinite" id="XML">
    <question>How many licks does it take to get to the center of a Tootsie Pop?</question>
<question>
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>points</td>
        <td>*numeric*</td>
        <td>1</td>
        <td>Setting this attribute with a *numeric* value, such as an integer or decimal, will give the question some point value, which is factored into the quiz's running and final score. Do note, if all questions are worth 0 points, the quiz's resulting maximum possible score will always be 0%.</td>
    </tr>
    <tr valign="top">
        <td>attempts</td>
        <td>*integer*<br>
            infinite</td>
        <td>infinite</td>
        <td>Setting this attribute with an *integer*, or whole number, value will permit the user to only answer the given question up to the allotted number of times permitted or until the question is answered correctly, whichever comes first. Not setting this attribute is equivalent to setting its value to *infinite*, which allows the user to continuously attempt to answer the question until the correct answer is given.</td>
    </tr>
    <tr valign="top">
        <td>id</td>
        <td>*string*</td>
        <td>*null*</td>
        <td>Setting this attribute with a *string* will assign the element the given ID. The ID assigned to the element is not used for any special purpose and is mostly intended for use by developers. This property is optional.</td>
    </tr>
    <tr valign="top">
        <td>type</td>
        <td>multichoice<br>
            multianswer<br>
            shortanswer<br>
            truefalse</td>
        <td>*null*</td>
        <td>Setting this attribute with the relevant question type from the list of types provided will help improve the performance of your Smarty application. For multiple choice questions, use the *multichoice* question type. This property, however, is optional. If not set, the application will determine the question type automatically.</td>
    </tr>
</table>






##### 3. After, create a list of answer options for the question:

###### Using HTML
    
Answer options can be added to a question using the `<smarty-answer>` element:

```html
<smarty-question>
    How many licks does it take to get to the center of a Tootsie Pop?
    <smarty-answer>364</smarty-answer>
    <smarty-answer>252</smarty-answer>
    <smarty-answer>411</smarty-answer>
    <smarty-answer>144</smarty-answer>
    <smarty-answer>TBD</smarty-answer>
</smarty-question>
```
    
###### Using JSON
    
Answer options can be added by setting the `options` property on a new line of the preferred question object, but do note, multiple answer options should be added using an array rather than string notion:

```json
{
    "question": "How many licks does it take to get to the center of a Tootsie Pop?",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON",
    "options": [
        364,
        252,
        411,
        144,
        "TBD"
    ]
}
```
    
###### Using XML
    
In XML data files, answer options can be added to a question using the `<option>` object:
    
```xml
<question points="1" attempts="infinite" id="XML">
    <question>How many licks does it take to get to the center of a Tootsie Pop?</question>
    <option>364</option>
    <option>252</option>
    <option>411</option>
    <option>144</option>
    <option>TBD</option>
<question>
```



##### 4. Then, designate the correct answer option:

###### Using HTML
    
In HTML, the correct answer option is designated by setting the `data-answer` attribute on the correct `<smarty-answer>` element:

```html
<smarty-question>
    How many licks does it take to get to the center of a Tootsie Pop?
    <smarty-answer>364</smarty-answer>
    <smarty-answer>252</smarty-answer>
    <smarty-answer>411</smarty-answer>
    <smarty-answer>144</smarty-answer>
    <smarty-answer data-answer="true">TBD</smarty-answer>
</smarty-question>
```

<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>data-answer</td>
        <td>true<br>
            false</td>
        <td>false</td>
        <td>In order to count an answer option as a correct answer, setting the given answer's attribute value to *true* is **required**. Since the default value is assumed to be *false*, setting the attribute to *false* is not mandatory although it may be preferred for clarity.</td>
    </tr>
</table>
    
> Bear in mind that a multiple choice question should only have one (1) answer option with its `data-answer` attribute set to *true*. Otherwise, the question is treated as a multiple answer question, not multiple choice.
    
###### Using JSON
    
In JSON, the correct answer option is designated by setting the `answer` property on a new line of the question object. An integer corresponding to the item number of the correct answer from the `options` list should be used:

```json
{
    "question": "How many licks does it take to get to the center of a Tootsie Pop?",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON",
    "options": [
        364,
        252,
        411,
        144,
        "TBD"
    ],
    "answer": 5
}
```

<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>answer</td>
        <td>*integer*<br>
            *array*</td>
        <td>*null*</td>
        <td>In order to specify the correct answer, the answer property must be set to an *integer* value. This value should correlate to the item number of the correct answer in the option list. Alternatively, *array* notation can be used to specify one or more correct answers, where multiple values within the array are treated as a multiple answer question instead of multiple choice.</td>
    </tr>
</table>
    
> Bear in mind that the `answer` property accepts both *string* and *array* notion. While string notation defaults to multiple choice questions, arrays are configurable for both multiple choice and multiple answer questions. Thus, if array notion is used, only one (1) answer option should be given for multiple choice questions. Otherwise, arrays with more than one (>1) value will be treated as a multiple answer question, not multiple choice.
    
###### Using XML
    
In XML, the correct answer option is designated by setting the `answer` attribute on the correct `<option>` object:

```xml
<question points="1" attempts="infinite" id="XML">
    <question>How many licks does it take to get to the center of a Tootsie Pop?</question>
    <option>364</option>
    <option>252</option>
    <option>411</option>
    <option>144</option>
    <option answer="true">TBD</option>
<question>
```

<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>answer</td>
        <td>true<br>
            false</td>
        <td>false</td>
        <td>In order to count an answer option as a correct answer, setting the given answer's attribute value to *true* is **required**. Since the default value is assumed to be *false*, setting the attribute to *false* is not mandatory although it may be preferred for clarity.</td>
    </tr>
</table>

> Bear in mind that a multiple choice question should only have one (1) answer option with its `answer` property set to *true*. Otherwise, the question is treated as a multiple answer question, not multiple choice.






##### 5. Optionally, provide users with feedback to the question:

###### Using HTML

Feedback is added by using the `<smarty-feedback>` element:

```html
<smarty-question>
    How many licks does it take to get to the center of a Tootsie Pop?
    <smarty-answer>364</smarty-answer>
    <smarty-answer>252</smarty-answer>
    <smarty-answer>411</smarty-answer>
    <smarty-answer>144</smarty-answer>
    <smarty-answer data-answer="true">TBD</smarty-answer>
    <smarty-feedback>
        The Tootsie company once reported that a consensus could never been drawn. 
    </smarty-feedback>
</smarty-question>
```
        
> Do note, since feedback is intended to provide the user with additional insight into the question and its correct answer, feedback is not shown to the user until at least one (1) of the following conditions have been met:  
- If a question permits multiple attempts, feedback is given...
    1. When the user answers the question correctly
    2. When the user exhausts all permitted attempts
- If a question permits only one (1) attempt, feedback is given...
    1. After the user answers the question, regardless of right or wrong
- If a question permits an infinite number of attempts, feedback is given...
    1. Only after the user answers the question correctly
        
        
###### Using JSON

In JSON, feedback is added by setting the `feedback` property on a new line of the question object:

```json
{
    "question": "How many licks does it take to get to the center of a Tootsie Pop?",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON",
    "options": [
        364,
        252,
        411,
        144,
        "TBD"
    ],
    "answer": 5,
    "feedback": "The Tootsie company once reported that a consensus could never been drawn."
}
```
        
> Do note, since feedback is intended to provide the user with additional insight into the question and its correct answer, feedback is not shown to the user until at least one (1) of the following conditions have been met:  
- If a question permits multiple attempts, feedback is given...
    1. When the user answers the question correctly
    2. When the user exhausts all permitted attempts
- If a question permits only one (1) attempt, feedback is given...
    1. After the user answers the question, regardless of right or wrong
- If a question permits an infinite number of attempts, feedback is given...
    1. Only after the user answers the question correctly
    
###### Using XML

In XML, feedback is added using a `feedback` element nested at the end of the question object:

```xml
<question points="1" attempts="infinite" id="XML">
    <question>How many licks does it take to get to the center of a Tootsie Pop?</question>
    <option>364</option>
    <option>252</option>
    <option>411</option>
    <option>144</option>
    <option answer="true">TBD</option>
    <feedback>The Tootsie company once reported that a consensus could never been drawn.</feedback>
<question>
```
        
> Do note, since feedback is intended to provide the user with additional insight into the question and its correct answer, feedback is not shown to the user until at least one (1) of the following conditions have been met:  
- If a question permits multiple attempts, feedback is given...
    1. When the user answers the question correctly
    2. When the user exhausts all permitted attempts
- If a question permits only one (1) attempt, feedback is given...
    1. After the user answers the question, regardless of right or wrong
- If a question permits an infinite number of attempts, feedback is given...
    1. Only after the user answers the question correctly
        
        
        
##### 6. Optionally, provide users with a hint:

###### Using HTML

In HTML, a hint can be added by creating a `<smarty-hint>` element. Additionally, the `data-attempts` property should be set on the `<smarty-hint>` element to specify how many attempts the user must try before the hint is made available. If you prefer to have the hint showing by default, use the `data-show` property with a value of *true* instead of `data-attempts`. It's recommended that hints be added after all answer options and either before or after any question feedback:

```html
<smarty-question>
    How many licks does it take to get to the center of a Tootsie Pop?
    <smarty-answer>364</smarty-answer>
    <smarty-answer>252</smarty-answer>
    <smarty-answer>411</smarty-answer>
    <smarty-answer>144</smarty-answer>
    <smarty-answer data-answer="true">TBD</smarty-answer>
    <smarty-feedback>
        The Tootsie company once reported that a consensus could never been drawn.
    </smarty-feedback>
    <smarty-hint data-attempts="1" data-show="false">
        The world may never know.
    </smarty-hint>
</smarty-question>
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr>
        <td>data-attempts</td>
        <td>*integer*</td>
        <td>1</td>
        <td>Setting this attribute with an *integer* value will set the minimum required number of attempts before the hint is given to the user.</td>
    </tr>
    <tr>
        <td>data-show</td>
        <td>true<br>
            false</td>
        <td>false</td>
        <td>Setting this attribute to *true* will show the hint by default. Setting this attribute to *false* will allow the hint to be toggled according to the value given in the `data-attempts` attribute.</td>
    </tr>
</table>
    
> Do note, since hints are intended to provide the user with guidance that may lead the user to the correct answer, hints are not shown to the user until a minimum number of attempts have been reached. To specify the number of attempts required before the user is able to receive hints, the `data-attempts` attribute is used on the `<smarty-hint>` element.

###### Using JSON

In JSON, a hint can be added by setting the `hint` property on a new line of the question object. Additionally, the `hintattempts` property should also be added on an a separate line of the question object to specify how many attempts the user must try before the hint is made available. If you prefer that the hint show by default,  the `hintshow` property should be set to *true* on a separate line of the question object:

```json
{
    "question": "How many licks does it take to get to the center of a Tootsie Pop?",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON",
    "options": [
        364,
        252,
        411,
        144,
        "TBD"
    ],
    "answer": 5,
    "feedback": "The Tootsie company once reported that a consensus could never been drawn.",
    "hint": "The world may never know.",
    "hintattempts": 1,
    "hintshow": false
}
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr>
        <td>hintattempts</td>
        <td>*integer*</td>
        <td>1</td>
        <td>Setting this attribute with an *integer* value will set the minimum required number of attempts before the hint is given to the user.</td>
    </tr>
    <tr>
        <td>hintshow</td>
        <td>true<br>
            false</td>
        <td>false</td>
        <td>Setting this attribute to *true* will show the hint by default. Setting this attribute to *false* will allow the hint to be toggled according to the value given in the `data-attempts` attribute.</td>
    </tr>
</table>
    
> Do note, since hints are intended to provide the user with guidance that may lead the user to the correct answer, hints are not shown to the user until a minimum number of attempts have been reached. To specify the number of attempts required before the user is able to receive hints, the `hintattempts` property is used.

###### Using XML

In XML, a hint can be added by creating a `<hint>` object. Additionally, the `attempts` property should be set on the `<hint>` object to specify how many attempts the user must try before the hint is made available. If you prefer that the hint show by default,  the `show` property should be set to *true* on the `<hint>` object:

```xml
<question points="1" attempts="infinite" id="XML">
    <question>How many licks does it take to get to the center of a Tootsie Pop?</question>
    <option>364</option>
    <option>252</option>
    <option>411</option>
    <option>144</option>
    <option answer="true">TBD</option>
    <feedback>The Tootsie company once reported that a consensus could never been drawn.</feedback>
    <hint attempts="1" show="false">The world may never know.</hint>
<question>
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr>
        <td>attempts</td>
        <td>*integer*</td>
        <td>1</td>
        <td>Setting this attribute with an *integer* value will set the minimum required number of attempts before the hint is given to the user.</td>
    </tr>
    <tr>
        <td>show</td>
        <td>true<br>
            false</td>
        <td>false</td>
        <td>Setting this attribute to *true* will show the hint by default. Setting this attribute to *false* will allow the hint to be toggled according to the value given in the `data-attempts` attribute.</td>
    </tr>
</table>
    
> Do note, since hints are intended to provide the user with guidance that may lead the user to the correct answer, hints are not shown to the user until a minimum number of attempts have been reached. To specify the number of attempts required before the user is able to receive hints, the `attempts` attribute is used on the `<hint>` object.





#### Multiple Answer Questions <a id="MultiAnswer"></a>

Similar to multiple choice questions, multiple answer questions are ones in which more than one (>1) correct answer exists within a given list of answer options. To create a multiple answer question, several answer options must be created for which more than one (>1) answer option are the correct answers.

##### 1. Start by creating a question and add in question text:

###### Using HTML

When using HTML, a question is created using the `<smarty-question>` element:

```html
<smarty-question>
    How many licks does it take to get to the center of a Tootsie Pop?
</smarty-question>
```

###### Using JSON

When using JSON, a question is created using object notation:

```json
{
    "question": "How many licks does it take to get to the center of a Tootsie Pop?"
}
```

###### Using XML

When using XML, a question is identified using a `<question>` element with a subsequent `<question>` element nested inside for holding the question's text:

```xml
<question>
    <question>How many licks does it take to get to the center of a Tootsie Pop?</question>
<question>
```
    
    
    
##### 2. Next, set the question's properties based on your preferences:

###### Using HTML

The HTML attributes are applied to the `<smarty-question>` element directly:

```html
<smarty-question data-points="1" data-attempts="infinite" data-id="HTML">
    How many licks does it take to get to the center of a Tootsie Pop?
</smarty-question>
```

<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>data-points</td>
        <td>*numeric*</td>
        <td>1</td>
        <td>Setting this attribute with a *numeric* value, such as an integer or decimal, will give the question some point value, which is factored into the quiz's running and final score. Do note, if all questions are worth 0 points, the quiz's resulting maximum possible score will always be 0%.</td>
    </tr>
    <tr valign="top">
        <td>data-attempts</td>
        <td>*integer*<br>
            infinite</td>
        <td>infinite</td>
        <td>Setting this attribute with an *integer*, or whole number, value will permit the user to only answer the given question up to the allotted number of times permitted or until the question is answered correctly, whichever comes first. Not setting this attribute is equivalent to setting its value to *infinite*, which allows the user to continuously attempt to answer the question until the correct answer is given.</td>
    </tr>
    <tr valign="top">
        <td>data-id</td>
        <td>*string*</td>
        <td>*null*</td>
        <td>Setting this attribute with a *string* will assign the element the given ID. The ID assigned to the element is not used for any special purpose and is mostly intended for use by developers. This property is optional.</td>
    </tr>
</table>
    
###### Using JSON
    
In JSON, the following properties are declared on a new line within the question object:
    
```json
{
    "question": "How many licks does it take to get to the center of a Tootsie Pop?",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON"
}
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>points</td>
        <td>*numeric*</td>
        <td>1</td>
        <td>Setting this property with a *numeric* value, such as an integer or decimal, will give the question some point value, which is factored into the quiz's running and final score. Do note, if all questions are worth 0 points, the quiz's resulting maximum possible score will always be 0%.</td>
    </tr>
    <tr valign="top">
        <td>attempts</td>
        <td>*integer*<br>
            infinite</td>
        <td>infinite</td>
        <td>Setting this property with an *integer*, or whole number, value will permit the user to only answer the given question up to the allotted number of times permitted or until the question is answered correctly, whichever comes first. Not setting this attribute is equivalent to setting its value to *infinite*, which allows the user to continuously attempt to answer the question until the correct answer is given.</td>
    </tr>
    <tr valign="top">
        <td>id</td>
        <td>*string*</td>
        <td>*null*</td>
        <td>Setting this property with a *string* will assign the element the given ID. The ID assigned to the element is not used for any special purpose and is mostly intended for use by developers. This property is optional.</td>
    </tr>
    <tr valign="top">
        <td>type</td>
        <td>multichoice<br>
            multianswer<br>
            shortanswer<br>
            truefalse</td>
        <td>*null*</td>
        <td>Setting this property with the relevant question type from the list of types provided will help improve the performance of your Smarty application. For multiple choice questions, use the *multichoice* question type. This property, however, is optional. If not set, the application will determine the question type automatically.</td>
    </tr>
</table>
    
###### Using XML
    
In XML, the following attributes can be added directly to the parent question element:
    
```xml
<question points="1" attempts="infinite" id="XML">
    <question>How many licks does it take to get to the center of a Tootsie Pop?</question>
<question>
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>points</td>
        <td>*numeric*</td>
        <td>1</td>
        <td>Setting this attribute with a *numeric* value, such as an integer or decimal, will give the question some point value, which is factored into the quiz's running and final score. Do note, if all questions are worth 0 points, the quiz's resulting maximum possible score will always be 0%.</td>
    </tr>
    <tr valign="top">
        <td>attempts</td>
        <td>*integer*<br>
            infinite</td>
        <td>infinite</td>
        <td>Setting this attribute with an *integer*, or whole number, value will permit the user to only answer the given question up to the allotted number of times permitted or until the question is answered correctly, whichever comes first. Not setting this attribute is equivalent to setting its value to *infinite*, which allows the user to continuously attempt to answer the question until the correct answer is given.</td>
    </tr>
    <tr valign="top">
        <td>id</td>
        <td>*string*</td>
        <td>*null*</td>
        <td>Setting this attribute with a *string* will assign the element the given ID. The ID assigned to the element is not used for any special purpose and is mostly intended for use by developers. This property is optional.</td>
    </tr>
    <tr valign="top">
        <td>type</td>
        <td>multichoice<br>
            multianswer<br>
            shortanswer<br>
            truefalse</td>
        <td>*null*</td>
        <td>Setting this attribute with the relevant question type from the list of types provided will help improve the performance of your Smarty application. For multiple choice questions, use the *multichoice* question type. This property, however, is optional. If not set, the application will determine the question type automatically.</td>
    </tr>
</table>






##### 3. After, create a list of answer options for the question:

###### Using HTML
    
Answer options can be added to a question using the `<smarty-answer>` element:

```html
<smarty-question>
    How many licks does it take to get to the center of a Tootsie Pop?
    <smarty-answer>364</smarty-answer>
    <smarty-answer>252</smarty-answer>
    <smarty-answer>411</smarty-answer>
    <smarty-answer>144</smarty-answer>
    <smarty-answer>TBD</smarty-answer>
</smarty-question>
```
    
###### Using JSON
    
Answer options can be added by setting the `options` property on a new line of the preferred question object, but do note, multiple answer options should be added using an array rather than string notion:

```json
{
    "question": "How many licks does it take to get to the center of a Tootsie Pop?",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON",
    "options": [
        364,
        252,
        411,
        144,
        "TBD"
    ]
}
```
    
###### Using XML
    
In XML data files, answer options can be added to a question using the `<option>` object:
    
```xml
<question points="1" attempts="infinite" id="XML">
    <question>How many licks does it take to get to the center of a Tootsie Pop?</question>
    <option>364</option>
    <option>252</option>
    <option>411</option>
    <option>144</option>
    <option>TBD</option>
<question>
```



##### 4. Then, designate the correct answer option:

###### Using HTML
    
In HTML, the correct answer options are designated by setting the `data-answer` attribute on the correct `<smarty-answer>` elements:

```html
<smarty-question>
    How many licks does it take to get to the center of a Tootsie Pop?
    <smarty-answer data-answer="true">364</smarty-answer>
    <smarty-answer data-answer="true">252</smarty-answer>
    <smarty-answer data-answer="true">411</smarty-answer>
    <smarty-answer data-answer="true">144</smarty-answer>
    <smarty-answer>TBD</smarty-answer>
</smarty-question>
```

<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>data-answer</td>
        <td>true<br>
            false</td>
        <td>false</td>
        <td>In order to count an answer option as a correct answer, setting the given answer's attribute value to *true* is **required**. Since the default value is assumed to be *false*, setting the attribute to *false* is not mandatory although it may be preferred for clarity.</td>
    </tr>
</table>
    
> Unlike multiple choice questions, multiple answer questions should have more than one (>1) answer option with its `data-answer` attribute set to *true*. Otherwise, the question is treated as a multiple choice question, not multiple answer.
    
###### Using JSON
    
In JSON, the correct answer option is designated by setting the `answer` property on a new line of the question object. An array of numbers corresponding to the item numbers of the correct answers from the `options` list should be used:

```json
{
    "question": "How many licks does it take to get to the center of a Tootsie Pop?",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON",
    "options": [
        364,
        252,
        411,
        144,
        "TBD"
    ],
    "answer": [
        1,
        2,
        3,
        4
    ]
}
```

<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>answer</td>
        <td>*integer*<br>
            *array*</td>
        <td>*null*</td>
        <td>In order to specify the correct answer, the answer property must be set to an *integer* value. This value should correlate to the item number of the correct answer in the option list. Alternatively, *array* notation can be used to specify one or more correct answers, where multiple values within the array are treated as a multiple answer question instead of multiple choice.</td>
    </tr>
</table>
    
> Bear in mind that the `answer` property accepts both *string* and *array* notion. While string notion defaults to multiple choice questions, arrays are configurable for both multiple choice and multiple answer questions. Thus, if array notation is used, more than one (>1) answer option should be given for multiple answer questions. Otherwise, arrays with only one (1) value will be treated as a multiple choice question, not multiple answer.
    
###### Using XML
    
In XML, the correct answer options are designated by setting the `answer` attribute on the correct `<option>` object:

```xml
<question points="1" attempts="infinite" id="XML">
    <question>How many licks does it take to get to the center of a Tootsie Pop?</question>
    <option answer="true">364</option>
    <option answer="true">252</option>
    <option answer="true">411</option>
    <option answer="true">144</option>
    <option>TBD</option>
<question>
```

<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>answer</td>
        <td>true<br>
            false</td>
        <td>false</td>
        <td>In order to count an answer option as a correct answer, setting the given answer's attribute value to *true* is **required**. Since the default value is assumed to be *false*, setting the attribute to *false* is not mandatory although it may be preferred for clarity.</td>
    </tr>
</table>

> Unlike multiple choice questions, multiple answer questions should have more than one (>1) answer option with its `answer` attribute set to *true*. Otherwise, the question is treated as a multiple choice question, not multiple answer.







##### 5. Optionally, provide users with feedback to the question:

###### Using HTML

Feedback is added by using the `<smarty-feedback>` element:

```html
<smarty-question>
    How many licks does it take to get to the center of a Tootsie Pop?
    <smarty-answer data-answer="true">364</smarty-answer>
    <smarty-answer data-answer="true">252</smarty-answer>
    <smarty-answer data-answer="true">411</smarty-answer>
    <smarty-answer data-answer="true">144</smarty-answer>
    <smarty-answer>TBD</smarty-answer>
    <smarty-feedback>
        Different studies conducted by different groups of researchers all came to different conclusions. 
    </smarty-feedback>
</smarty-question>
```
        
> Do note, since feedback is intended to provide the user with additional insight into the question and its correct answer, feedback is not shown to the user until at least one (1) of the following conditions have been met:  
- If a question permits multiple attempts, feedback is given...
    1. When the user answers the question correctly
    2. When the user exhausts all permitted attempts
- If a question permits only one (1) attempt, feedback is given...
    1. After the user answers the question, regardless of right or wrong
- If a question permits an infinite number of attempts, feedback is given...
    1. Only after the user answers the question correctly
        
        
###### Using JSON

In JSON, feedback is added by setting the `feedback` property on a new line of the question object:

```json
{
    "question": "How many licks does it take to get to the center of a Tootsie Pop?",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON",
    "options": [
        364,
        252,
        411,
        144,
        "TBD"
    ],
    "answer": 5,
    "feedback": "Different studies conducted by different groups of researchers all came to different conclusions."
}
```
        
> Do note, since feedback is intended to provide the user with additional insight into the question and its correct answer, feedback is not shown to the user until at least one (1) of the following conditions have been met:  
- If a question permits multiple attempts, feedback is given...
    1. When the user answers the question correctly
    2. When the user exhausts all permitted attempts
- If a question permits only one (1) attempt, feedback is given...
    1. After the user answers the question, regardless of right or wrong
- If a question permits an infinite number of attempts, feedback is given...
    1. Only after the user answers the question correctly
    
###### Using XML

In XML, feedback is added using a `feedback` element nested at the end of the question object:

```xml
<question points="1" attempts="infinite" id="XML">
    <question>How many licks does it take to get to the center of a Tootsie Pop?</question>
    <option>364</option>
    <option>252</option>
    <option>411</option>
    <option>144</option>
    <option answer="true">TBD</option>
    <feedback>Different studies conducted by different groups of researchers all came to different conclusions.</feedback>
<question>
```
        
> Do note, since feedback is intended to provide the user with additional insight into the question and its correct answer, feedback is not shown to the user until at least one (1) of the following conditions have been met:  
- If a question permits multiple attempts, feedback is given...
    1. When the user answers the question correctly
    2. When the user exhausts all permitted attempts
- If a question permits only one (1) attempt, feedback is given...
    1. After the user answers the question, regardless of right or wrong
- If a question permits an infinite number of attempts, feedback is given...
    1. Only after the user answers the question correctly
        
        
        
        
##### 6. Optionally, provide users with a hint:

###### Using HTML

In HTML, a hint can be added by creating a `<smarty-hint>` element. Additionally, the `data-attempts` property should be set on the `<smarty-hint>` element to specify how many attempts the user must try before the hint is made available. It's recommended that hints be added after all answer options and either before or after any question feedback:

```html
<smarty-question>
    How many licks does it take to get to the center of a Tootsie Pop?
    <smarty-answer>364</smarty-answer>
    <smarty-answer>252</smarty-answer>
    <smarty-answer>411</smarty-answer>
    <smarty-answer>144</smarty-answer>
    <smarty-answer data-answer="true">TBD</smarty-answer>
    <smarty-feedback>
        Different studies conducted by different groups of researchers all came to different conclusions.
    </smarty-feedback>
    <smarty-hint data-attempts="1">
        No one has ever been wrong.
    </smarty-hint>
</smarty-question>
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr>
        <td>data-attempts</td>
        <td>*integer*</td>
        <td>1</td>
        <td>Setting this attribute with an *integer* value will set the minimum required number of attempts before the hint is given to the user.</td>
    </tr>
</table>
    
> Do note, since hints are intended to provide the user with guidance that may lead the user to the correct answer, hints are not shown to the user until a minimum number of attempts have been reached. To specify the number of attempts required before the user is able to receive hints, the `data-attempts` attribute is used on the `<smarty-hint>` element.

###### Using JSON

In JSON, a hint can be added by setting the `hint` property on a new line of the question object. Additionally, the `hintattempts` property should also be added on an a separate line of the question object to specify how many attempts the user must try before the hint is made available:

```json
{
    "question": "How many licks does it take to get to the center of a Tootsie Pop?",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON",
    "options": [
        364,
        252,
        411,
        144,
        "TBD"
    ],
    "answer": 5,
    "feedback": "Different studies conducted by different groups of researchers all came to different conclusions.",
    "hint": "No one has ever been wrong.",
    "hintattempts": 1
}
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr>
        <td>hintattempts</td>
        <td>*integer*</td>
        <td>1</td>
        <td>Setting this attribute with an *integer* value will set the minimum required number of attempts before the hint is given to the user.</td>
    </tr>
</table>
    
> Do note, since hints are intended to provide the user with guidance that may lead the user to the correct answer, hints are not shown to the user until a minimum number of attempts have been reached. To specify the number of attempts required before the user is able to receive hints, the `hintattempts` property is used.

###### Using XML

In XML, a hint can be added by creating a `<hint>` object. Additionally, the `attempts` property should be set on the `<hint>` object to specify how many attempts the user must try before the hint is made available:

```xml
<question points="1" attempts="infinite" id="XML">
    <question>How many licks does it take to get to the center of a Tootsie Pop?</question>
    <option>364</option>
    <option>252</option>
    <option>411</option>
    <option>144</option>
    <option answer="true">TBD</option>
    <feedback>Different studies conducted by different groups of researchers all came to different conclusions.</feedback>
    <hint attempts="1">No one has ever been wrong.</hint>
<question>
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr>
        <td>data-attempts</td>
        <td>*integer*</td>
        <td>1</td>
        <td>Setting this attribute with an *integer* value will set the minimum required number of attempts before the hint is given to the user.</td>
    </tr>
</table>
    
> Do note, since hints are intended to provide the user with guidance that may lead the user to the correct answer, hints are not shown to the user until a minimum number of attempts have been reached. To specify the number of attempts required before the user is able to receive hints, the `attempts` attribute is used on the `<hint>` object.

#### Short Answer Questions <a id="ShortAnswer"></a>

Another common type of question frequently found on quizzes is the short answer question. Short answer questions require the user to provide some text input, which upon validation, is either marked as correct or incorrect. Because questions allowing users to input an answer can easily introduce a wide range of error, Smarty tries to account for answer variations by providing a means for accepting alternative, or variant, answers.

##### 1. Start by creating a question and add in question text:

###### Using HTML

When using HTML, a question is created using the `<smarty-question>` element:

```html
<smarty-question>
    On what road does the Muffin Man live?
</smarty-question>
```

###### Using JSON

When using JSON, a question is created using object notation:

```json
{
    "question": "On what road does the Muffin Man live?"
}
```

###### Using XML

When using XML, a question is identified using a `<question>` element with a subsequent `<question>` element nested inside for holding the question's text:

```xml
<question>
    <question>On what road does the Muffin Man live?</question>
<question>
```
    
    
    
    
##### 2. Next, set the question's properties based on your preferences:

###### Using HTML

The HTML attributes are applied to the `<smarty-question>` element directly:

```html
<smarty-question data-points="1" data-attempts="infinite" data-id="HTML">
    On what road does the Muffin Man live?
</smarty-question>
```

<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>data-points</td>
        <td>*numeric*</td>
        <td>1</td>
        <td>Setting this attribute with a *numeric* value, such as an integer or decimal, will give the question some point value, which is factored into the quiz's running and final score. Do note, if all questions are worth 0 points, the quiz's resulting maximum possible score will always be 0%.</td>
    </tr>
    <tr valign="top">
        <td>data-attempts</td>
        <td>*integer*<br>
            infinite</td>
        <td>infinite</td>
        <td>Setting this attribute with an *integer*, or whole number, value will permit the user to only answer the given question up to the allotted number of times permitted or until the question is answered correctly, whichever comes first. Not setting this attribute is equivalent to setting its value to *infinite*, which allows the user to continuously attempt to answer the question until the correct answer is given.</td>
    </tr>
    <tr valign="top">
        <td>data-id</td>
        <td>*string*</td>
        <td>*null*</td>
        <td>Setting this attribute with a *string* will assign the element the given ID. The ID assigned to the element is not used for any special purpose and is mostly intended for use by developers. This property is optional.</td>
    </tr>
</table>
    
###### Using JSON
    
In JSON, the following properties are declared on a new line within the question object:
    
```json
{
    "question": "On what road does the Muffin Man live?",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON"
}
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>points</td>
        <td>*numeric*</td>
        <td>1</td>
        <td>Setting this property with a *numeric* value, such as an integer or decimal, will give the question some point value, which is factored into the quiz's running and final score. Do note, if all questions are worth 0 points, the quiz's resulting maximum possible score will always be 0%.</td>
    </tr>
    <tr valign="top">
        <td>attempts</td>
        <td>*integer*<br>
            infinite</td>
        <td>infinite</td>
        <td>Setting this property with an *integer*, or whole number, value will permit the user to only answer the given question up to the allotted number of times permitted or until the question is answered correctly, whichever comes first. Not setting this attribute is equivalent to setting its value to *infinite*, which allows the user to continuously attempt to answer the question until the correct answer is given.</td>
    </tr>
    <tr valign="top">
        <td>id</td>
        <td>*string*</td>
        <td>*null*</td>
        <td>Setting this property with a *string* will assign the element the given ID. The ID assigned to the element is not used for any special purpose and is mostly intended for use by developers. This property is optional.</td>
    </tr>
    <tr valign="top">
        <td>type</td>
        <td>multichoice<br>
            multianswer<br>
            shortanswer<br>
            truefalse</td>
        <td>*null*</td>
        <td>Setting this property with the relevant question type from the list of types provided will help improve the performance of your Smarty application. For multiple choice questions, use the *multichoice* question type. This property, however, is optional. If not set, the application will determine the question type automatically.</td>
    </tr>
</table>
    
###### Using XML
    
In XML, the following attributes can be added directly to the parent question element:
    
```xml
<question points="1" attempts="infinite" id="XML">
    <question>On what road does the Muffin Man live?</question>
<question>
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>points</td>
        <td>*numeric*</td>
        <td>1</td>
        <td>Setting this attribute with a *numeric* value, such as an integer or decimal, will give the question some point value, which is factored into the quiz's running and final score. Do note, if all questions are worth 0 points, the quiz's resulting maximum possible score will always be 0%.</td>
    </tr>
    <tr valign="top">
        <td>attempts</td>
        <td>*integer*<br>
            infinite</td>
        <td>infinite</td>
        <td>Setting this attribute with an *integer*, or whole number, value will permit the user to only answer the given question up to the allotted number of times permitted or until the question is answered correctly, whichever comes first. Not setting this attribute is equivalent to setting its value to *infinite*, which allows the user to continuously attempt to answer the question until the correct answer is given.</td>
    </tr>
    <tr valign="top">
        <td>id</td>
        <td>*string*</td>
        <td>*null*</td>
        <td>Setting this attribute with a *string* will assign the element the given ID. The ID assigned to the element is not used for any special purpose and is mostly intended for use by developers. This property is optional.</td>
    </tr>
    <tr valign="top">
        <td>type</td>
        <td>multichoice<br>
            multianswer<br>
            shortanswer<br>
            truefalse</td>
        <td>*null*</td>
        <td>Setting this attribute with the relevant question type from the list of types provided will help improve the performance of your Smarty application. For multiple choice questions, use the *multichoice* question type. This property, however, is optional. If not set, the application will determine the question type automatically.</td>
    </tr>
</table>



##### 3. After, setup your answer input box:

###### Using HTML

In HTML, a single (1) blank answer option should be created using a `<smarty-answer>` element. This blank element indicates that the question is in a short answer format:

```html
<smarty-question>
    On what road does the Muffin Man live?
    <smarty-answer></smarty-answer>
</smarty-question>
```

###### Using JSON

In JSON, the `option` property is used to specificy preset answer options. Since short answer questions do not have a predefined set of answer options, the `option` property should be remain unset. You can do so by simply leaving off the `option` property altogether. Thus, your JSON data will still look the same as it did in the previous step:

```json
{
    "question": "On what road does the Muffin Man live?",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON"
}
```

###### Using XML

In XML, a single (1) `<option>` element is used to indicate that the question's format is short answer. At this time, the contents of the `<option>` element can remain empty. We will fill it in the next step:

```xml
<question points="1" attempts="infinite" id="XML">
    <question>On what road does the Muffin Man live?</question>
    <option></option>
<question>
```




##### 4. Then, give the correct answer and any acceptable answer alternatives:

###### Using HTML

With the blank `<smarty-answer>` element, use the `data-answer` attribute to set the short answer question's correct answer. Additionally, use the `data-answer-alts` attribute to provide a semi-colon-delimited list of any other acceptable answers as an alternative to the correct answer. If you prefer that user input be case sensitive, also set the `data-case-sensitive` attribute for the `<smarty-answer>` element:

```html
<smarty-question>
    On what road does the Muffin Man live?
    <smarty-answer data-answer="Drury Lane"
                   data-case-sensitive="true"
                   data-answer-alts="Drury Ln; Drurie Lane; Drurie Ln"></smarty-answer>
</smarty-question>
```

<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>data-answer</td>
        <td>*string*</td>
        <td>*null*</td>
        <td>Unlike multiple choice and multiple answer, this attribute takes on a new form when it comes to short answer questions: A *string* value equivalent to your preferred correct answer is **required**.</td>
    </tr>
    <tr valign="top">
        <td>data-answer-alts</td>
        <td>*string*</td>
        <td>*null*</td>
        <td>Standing for alternatives, this attribute accepts one or more (>=1) *string* values in a semi-colon-delimited list, where each value in the list can also be accepted as the question's correct answer.</td>
    </tr>
    <tr valign="top">
        <td>data-case-sensitive</td>
        <td>true<br>
            false</td>
        <td>false</td>
        <td>If set to *true*, the user is required to input an answer which matches in case to either the correct answer given or one of the alternative answers provided. If set to *false*, the user's input, the correct answer, and any alternative answers are validated on an all lowercase basis.</td>
    </tr>
</table>
    
> It's recommended that alternative answers be used to take into account possible user answer deviations. Suggested alternatives for text answers include misspellings, plausible typos, and abbreviations. Suggested alternatives for date answers include both text, short date, and long date formats.

###### Using JSON

Inside your question object, use a new line to set the `answer` property to the short answer question's correct answer. Additionally, use the `alts` property to provide a  list of any other alternative answers that should be accepted using array notation. If you prefer that user input be case sensitive, also set the `matchcase` property for your question object with a boolean *true* or *false*:

```json
{
    "question": "On what road does the Muffin Man live?",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON",
    "answer": "Drury Lane",
    "alts": [
        "Drury Ln",
        "Drurie Lane",
        "Drurie Ln"
    ],
    "matchcase": true
}
```

<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>answer</td>
        <td>*string*</td>
        <td>*null*</td>
        <td>A *string* value equivalent to your preferred correct answer is **required**.</td>
    </tr>
    <tr valign="top">
        <td>alts</td>
        <td>*array*</td>
        <td>*null*</td>
        <td>Standing for alternatives, this attribute accepts a single (1) array with one or more (>=1) values, where each value in the array can also be accepted as the question's correct answer.</td>
    </tr>
    <tr valign="top">
        <td>matchcase</td>
        <td>true<br>
            false</td>
        <td>false</td>
        <td>If set to *true*, the user is required to input an answer which matches in case to either the correct answer given or one of the alternative answers provided. If set to *false*, the user's input, the correct answer, and any alternative answers are validated on an all lowercase basis.</td>
    </tr>
</table>
    
> It's recommended that alternative answers be used to take into account possible user answer deviations. Suggested alternatives for text answers include misspellings, plausible typos, and abbreviations. Suggested alternatives for date answers include both text, short date, and long date formats.

###### Using XML

With the blank `<option>` object, fill in the correct answer between the object's opening and closing tags. Optionally, the `<option>` object's `answer` attribute can be set to *true* for consistency with other question types but is not required. Additionally, use the `alts` attribute to provide a semi-colon-delimited list of any other acceptable answers as an alternative to the correct answer. If you prefer that user input be case sensitive, also set the `matchcase` attribute for the `<option>` element:

```xml
<question points="1" attempts="infinite" id="XML">
    <question>On what road does the Muffin Man live?</question>
    <option answer="true" alts="Drury Ln; Drurie Lane; Drurie Ln" matchase="true">Drury Lane</option>
<question>
```

<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>answer</td>
        <td>*true*<br>
            *false*</td>
        <td>*true*</td>
        <td>This attribute is optional and only used for consistency purposes. Setting this attribute to *true* or *false* will ultimately have no effect as the answer will always be treated as *true*.</td>
    </tr>
    <tr valign="top">
        <td>alts</td>
        <td>*string*</td>
        <td>*null*</td>
        <td>Standing for alternatives, this attribute accepts one or more (>=1) *string* values in a semi-colon-delimited list, where each value in the list can also be accepted as the question's correct answer.</td>
    </tr>
    <tr valign="top">
        <td>matchcase</td>
        <td>true<br>
            false</td>
        <td>false</td>
        <td>If set to *true*, the user is required to input an answer which matches in case to either the correct answer given or one of the alternative answers provided. If set to *false*, the user's input, the correct answer, and any alternative answers are validated on an all lowercase basis.</td>
    </tr>
</table>
    
> It's recommended that alternative answers be used to take into account possible user answer deviations. Suggested alternatives for text answers include misspellings, plausible typos, and abbreviations. Suggested alternatives for date answers include both text, short date, and long date formats.
    
    
    
##### 5. Optionally, provide users with feedback to the question:

###### Using HTML

Feedback is added by using the `<smarty-feedback>` element:

```html
<smarty-question>
    On what road does the Muffin Man live?
    <smarty-answer data-answer="Drury Lane"
                   data-case-sensitive="true"
                   data-answer-alts="Drury Ln; Drurie Lane; Drurie Ln"></smarty-answer>
    <smarty-feedback>
        There's a Drury Lane is Chicago (Illinois) and London (UK). How will we ever find the Muffin Man?
    </smarty-feedback>
</smarty-question>
```
        
> Do note, since feedback is intended to provide the user with additional insight into the question and its correct answer, feedback is not shown to the user until at least one (1) of the following conditions have been met:  
- If a question permits multiple attempts, feedback is given...
    1. When the user answers the question correctly
    2. When the user exhausts all permitted attempts
- If a question permits only one (1) attempt, feedback is given...
    1. After the user answers the question, regardless of right or wrong
- If a question permits an infinite number of attempts, feedback is given...
    1. Only after the user answers the question correctly
        
        
###### Using JSON

In JSON, feedback is added by setting the `feedback` property on a new line of the question object:

```json
{
    "question": "On what road does the Muffin Man live?",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON",
    "answer": "Drury Lane",
    "alts": [
        "Drury Ln",
        "Drurie Lane",
        "Drurie Ln"
    ],
    "matchcase": true,
    "feedback": "There's a Drury Lane is Chicago (Illinois) and London (UK). How will we ever find the Muffin Man?"
}
```
        
> Do note, since feedback is intended to provide the user with additional insight into the question and its correct answer, feedback is not shown to the user until at least one (1) of the following conditions have been met:  
- If a question permits multiple attempts, feedback is given...
    1. When the user answers the question correctly
    2. When the user exhausts all permitted attempts
- If a question permits only one (1) attempt, feedback is given...
    1. After the user answers the question, regardless of right or wrong
- If a question permits an infinite number of attempts, feedback is given...
    1. Only after the user answers the question correctly
    
###### Using XML

In XML, feedback is added using a `feedback` element nested at the end of the question object:

```xml
<question points="1" attempts="infinite" id="XML">
    <question>On what road does the Muffin Man live?</question>
    <option answer="true" alts="Drury Ln; Drurie Lane; Drurie Ln" matchase="true">Drury Lane</option>
    <feedback>There's a Drury Lane is Chicago (Illinois) and London (UK). How will we ever find the Muffin Man?</feedback>
<question>
```
        
> Do note, since feedback is intended to provide the user with additional insight into the question and its correct answer, feedback is not shown to the user until at least one (1) of the following conditions have been met:  
- If a question permits multiple attempts, feedback is given...
    1. When the user answers the question correctly
    2. When the user exhausts all permitted attempts
- If a question permits only one (1) attempt, feedback is given...
    1. After the user answers the question, regardless of right or wrong
- If a question permits an infinite number of attempts, feedback is given...
    1. Only after the user answers the question correctly
        
        
        
        
        
##### 6. Optionally, provide users with a hint:

###### Using HTML

In HTML, a hint can be added by creating a `<smarty-hint>` element. Additionally, the `data-attempts` property should be set on the `<smarty-hint>` element to specify how many attempts the user must try before the hint is made available. It's recommended that hints be added after all answer options and either before or after any question feedback:

```html
<smarty-question>
    On what road does the Muffin Man live?
    <smarty-answer data-answer="Drury Lane"
                   data-case-sensitive="true"
                   data-answer-alts="Drury Ln; Drurie Lane; Drurie Ln"></smarty-answer>
    <smarty-feedback>
        There's a Drury Lane is Chicago (Illinois) and London (UK). How will we ever find the Muffin Man?
    </smarty-feedback>
    <smarty-hint data-attempts="1">
        Do you know the Muffin Man?
    </smarty-hint>
</smarty-question>
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr>
        <td>data-attempts</td>
        <td>*integer*</td>
        <td>1</td>
        <td>Setting this attribute with an *integer* value will set the minimum required number of attempts before the hint is given to the user.</td>
    </tr>
</table>
    
> Do note, since hints are intended to provide the user with guidance that may lead the user to the correct answer, hints are not shown to the user until a minimum number of attempts have been reached. To specify the number of attempts required before the user is able to receive hints, the `data-attempts` attribute is used on the `<smarty-hint>` element.

###### Using JSON

In JSON, a hint can be added by setting the `hint` property on a new line of the question object. Additionally, the `hintattempts` property should also be added on an a separate line of the question object to specify how many attempts the user must try before the hint is made available:

```json
{
    "question": "On what road does the Muffin Man live?",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON",
    "answer": "Drury Lane",
    "alts": [
        "Drury Ln",
        "Drurie Lane",
        "Drurie Ln"
    ],
    "matchcase": true,
    "feedback": "There's a Drury Lane is Chicago (Illinois) and London (UK). How will we ever find the Muffin Man?",
    "hint": "Do you know the Muffin Man?",
    "hintattempts:" 1
}
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr>
        <td>hintattempts</td>
        <td>*integer*</td>
        <td>1</td>
        <td>Setting this attribute with an *integer* value will set the minimum required number of attempts before the hint is given to the user.</td>
    </tr>
</table>
    
> Do note, since hints are intended to provide the user with guidance that may lead the user to the correct answer, hints are not shown to the user until a minimum number of attempts have been reached. To specify the number of attempts required before the user is able to receive hints, the `hintattempts` property is used.

###### Using XML

In XML, a hint can be added by creating a `<hint>` object. Additionally, the `attempts` property should be set on the `<hint>` object to specify how many attempts the user must try before the hint is made available:

```xml
<question points="1" attempts="infinite" id="XML">
    <question>On what road does the Muffin Man live?</question>
    <option answer="true" alts="Drury Ln; Drurie Lane; Drurie Ln" matchase="true">Drury Lane</option>
    <feedback>There's a Drury Lane is Chicago (Illinois) and London (UK). How will we ever find the Muffin Man?</feedback>
    <hint attempts="1">Do you know the Muffin Man?</hint>
<question>
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr>
        <td>data-attempts</td>
        <td>*integer*</td>
        <td>1</td>
        <td>Setting this attribute with an *integer* value will set the minimum required number of attempts before the hint is given to the user.</td>
    </tr>
</table>
    
> Do note, since hints are intended to provide the user with guidance that may lead the user to the correct answer, hints are not shown to the user until a minimum number of attempts have been reached. To specify the number of attempts required before the user is able to receive hints, the `attempts` attribute is used on the `<hint>` object.


#### True/False Questions <a id="TrueFalse"></a>

##### 1. Start by creating a question and add in question text:

###### Using HTML

When using HTML, a question is created using the `<smarty-question>` element:

```html
<smarty-question>
    Disneyland calls itself "The Most Magical Place on Earth."
</smarty-question>
```

###### Using JSON

When using JSON, a question is created using object notation:

```json
{
    "question": "Disneyland calls itself \"The Most Magical Place on Earth.\""
}
```

> Note, when double quotes are necessary inside a JSON string, the quotation marks must be escaped by using a backlash (\) immediately before the quotation symbol. Escaping quotes prevents the nested quotation marks from terminating the JSON string too early, which would result in a JSON syntax error.

###### Using XML

When using XML, a question is identified using a `<question>` element with a subsequent `<question>` element nested inside for holding the question's text:

```xml
<question>
    <question>Disneyland calls itself "The Most Magical Place on Earth."</question>
<question>
```
    
    
    
##### 2. Next, set the question's properties based on your preferences:

###### Using HTML

The HTML attributes are applied to the `<smarty-question>` element directly:

```html
<smarty-question data-points="1" data-attempts="infinite" data-id="HTML">
    Disneyland calls itself "The Most Magical Place on Earth."
</smarty-question>
```

<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>data-points</td>
        <td>*numeric*</td>
        <td>1</td>
        <td>Setting this attribute with a *numeric* value, such as an integer or decimal, will give the question some point value, which is factored into the quiz's running and final score. Do note, if all questions are worth 0 points, the quiz's resulting maximum possible score will always be 0%.</td>
    </tr>
    <tr valign="top">
        <td>data-attempts</td>
        <td>*integer*<br>
            infinite</td>
        <td>infinite</td>
        <td>Setting this attribute with an *integer*, or whole number, value will permit the user to only answer the given question up to the allotted number of times permitted or until the question is answered correctly, whichever comes first. Not setting this attribute is equivalent to setting its value to *infinite*, which allows the user to continuously attempt to answer the question until the correct answer is given.</td>
    </tr>
    <tr valign="top">
        <td>data-id</td>
        <td>*string*</td>
        <td>*null*</td>
        <td>Setting this attribute with a *string* will assign the element the given ID. The ID assigned to the element is not used for any special purpose and is mostly intended for use by developers. This property is optional.</td>
    </tr>
</table>
    
###### Using JSON
    
In JSON, the following properties are declared on a new line within the question object:
    
```json
{
    "question": "Disneyland calls itself \"The Most Magical Place on Earth.\"",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON"
}
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>points</td>
        <td>*numeric*</td>
        <td>1</td>
        <td>Setting this property with a *numeric* value, such as an integer or decimal, will give the question some point value, which is factored into the quiz's running and final score. Do note, if all questions are worth 0 points, the quiz's resulting maximum possible score will always be 0%.</td>
    </tr>
    <tr valign="top">
        <td>attempts</td>
        <td>*integer*<br>
            infinite</td>
        <td>infinite</td>
        <td>Setting this property with an *integer*, or whole number, value will permit the user to only answer the given question up to the allotted number of times permitted or until the question is answered correctly, whichever comes first. Not setting this attribute is equivalent to setting its value to *infinite*, which allows the user to continuously attempt to answer the question until the correct answer is given.</td>
    </tr>
    <tr valign="top">
        <td>id</td>
        <td>*string*</td>
        <td>*null*</td>
        <td>Setting this property with a *string* will assign the element the given ID. The ID assigned to the element is not used for any special purpose and is mostly intended for use by developers. This property is optional.</td>
    </tr>
    <tr valign="top">
        <td>type</td>
        <td>multichoice<br>
            multianswer<br>
            shortanswer<br>
            truefalse</td>
        <td>*null*</td>
        <td>Setting this property with the relevant question type from the list of types provided will help improve the performance of your Smarty application. For multiple choice questions, use the *multichoice* question type. This property, however, is optional. If not set, the application will determine the question type automatically.</td>
    </tr>
</table>
    
###### Using XML
    
In XML, the following attributes can be added directly to the parent question element:
    
```xml
<question points="1" attempts="infinite" id="XML">
    <question>Disneyland calls itself "The Most Magical Place on Earth."</question>
<question>
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>points</td>
        <td>*numeric*</td>
        <td>1</td>
        <td>Setting this attribute with a *numeric* value, such as an integer or decimal, will give the question some point value, which is factored into the quiz's running and final score. Do note, if all questions are worth 0 points, the quiz's resulting maximum possible score will always be 0%.</td>
    </tr>
    <tr valign="top">
        <td>attempts</td>
        <td>*integer*<br>
            infinite</td>
        <td>infinite</td>
        <td>Setting this attribute with an *integer*, or whole number, value will permit the user to only answer the given question up to the allotted number of times permitted or until the question is answered correctly, whichever comes first. Not setting this attribute is equivalent to setting its value to *infinite*, which allows the user to continuously attempt to answer the question until the correct answer is given.</td>
    </tr>
    <tr valign="top">
        <td>id</td>
        <td>*string*</td>
        <td>*null*</td>
        <td>Setting this attribute with a *string* will assign the element the given ID. The ID assigned to the element is not used for any special purpose and is mostly intended for use by developers. This property is optional.</td>
    </tr>
    <tr valign="top">
        <td>type</td>
        <td>multichoice<br>
            multianswer<br>
            shortanswer<br>
            truefalse</td>
        <td>*null*</td>
        <td>Setting this attribute with the relevant question type from the list of types provided will help improve the performance of your Smarty application. For multiple choice questions, use the *multichoice* question type. This property, however, is optional. If not set, the application will determine the question type automatically.</td>
    </tr>
</table>


##### 3. After, setup your question's answer options:

###### Using HTML

Smarty has been setup to automatically generate **TRUE** and **FALSE** buttons for you when true/false question is detected. If if using HTML, no additional configurations are required to enable this feature. Additionally, the true/false question does not utilize answer options, meaning that no answer options should be added to your `<smarty-question>` element. Thus, your HTML should still resemble the following example:

```html
<smarty-question data-points="1" data-attempts="infinite" data-id="HTML">
    Disneyland calls itself "The Most Magical Place on Earth."
</smarty-question>
```

###### Using JSON

In JSON, a true/false question is designated by setting the `options` property on a new line of your question object to an array equal to either `[true, false]` or `[false, true]`:

```json
{
    "question": "Disneyland calls itself \"The Most Magical Place on Earth.\"",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON",
    "options": [true, false]
}
```

###### Using XML

When using XML, no answer options are required to designate a true/false question, meaning that no `<option>` objects should be added to your `<question>` element. Thus, your XML should still resemble the following example:

```xml
<question points="1" attempts="infinite" id="XML">
    <question>Disneyland calls itself "The Most Magical Place on Earth."</question>
<question>
```

##### 4. Then, set the correct answer for the question:

###### Using HTML

In HTML, since no answer options were created, the correct answer for the true/false question should be set on the question itself. That is, the `data-answer` attribute is added to the `<smarty-question>` element:

```html
<smarty-question data-points="1" data-attempts="infinite" data-id="HTML" data-answer="false">
    Disneyland calls itself "The Most Magical Place on Earth."
</smarty-question>
```

###### Using JSON

The answer to the true/false question should be set in the question object's `answer` property on a new line. For true/false questions only, the `answer` property can be set to a string value of *true* or *false, an integer value or single-value array that corresponds to the item number of the correct answer within the `options` array, or a boolean value of *true* or *false*:

```json
{
    "question": "Disneyland calls itself \"The Most Magical Place on Earth.\"",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON",
    "options": [true, false],
    "answer": false
}
```

###### Using XML

In XML, a true/false question is designated by setting the `answer` attribute on the nested `<question>` element, which contains the question text. 

```xml
<question points="1" attempts="infinite" id="XML">
    <question answer="false">Disneyland calls itself "The Most Magical Place on Earth."</question>
<question>
```

> Do note, setting the `answer` attribute on the outermost `<question>` object is incorrect and will result in an error when attempting to load the question data.
    
    

    
##### 5. Optionally, provide users with feedback to the question:

###### Using HTML

Feedback is added by using the `<smarty-feedback>` element:

```html
<smarty-question data-points="1" data-attempts="infinite" data-id="HTML" data-answer="false">
    Disneyland calls itself "The Most Magical Place on Earth."
    <smarty-feedback>
        California's Disneyland actually uses the motto, "The Happiest Place on Earth." It's Walt Disney World's Magic Kindom in Orland, FL that calls itself "The Most Magical Place on Earth."
    </smarty-feedback>
</smarty-question>
```
        
> Do note, since feedback is intended to provide the user with additional insight into the question and its correct answer, feedback is not shown to the user until at least one (1) of the following conditions have been met:  
- If a question permits multiple attempts, feedback is given...
    1. When the user answers the question correctly
    2. When the user exhausts all permitted attempts
- If a question permits only one (1) attempt, feedback is given...
    1. After the user answers the question, regardless of right or wrong
- If a question permits an infinite number of attempts, feedback is given...
    1. Only after the user answers the question correctly
    
###### Using JSON

In JSON, feedback is added by setting the `feedback` property on a new line of the question object:

```json
{
    "question": "Disneyland calls itself \"The Most Magical Place on Earth.\"",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON",
    "options": [true, false],
    "answer": false,
    "feedback": "California's Disneyland actually uses the motto, \"The Happiest Place on Earth.\" It's Walt Disney World's Magic Kindom in Orland, FL that calls itself \"The Most Magical Place on Earth.\""
}
```
        
> Do note, since feedback is intended to provide the user with additional insight into the question and its correct answer, feedback is not shown to the user until at least one (1) of the following conditions have been met:  
- If a question permits multiple attempts, feedback is given...
    1. When the user answers the question correctly
    2. When the user exhausts all permitted attempts
- If a question permits only one (1) attempt, feedback is given...
    1. After the user answers the question, regardless of right or wrong
- If a question permits an infinite number of attempts, feedback is given...
    1. Only after the user answers the question correctly

###### Using XML

In XML, feedback is added using a `feedback` element nested at the end of the question object:

```xml
<question points="1" attempts="infinite" id="XML">
    <question answer="false">Disneyland calls itself "The Most Magical Place on Earth."</question>
    <feedback>California's Disneyland actually uses the motto, "The Happiest Place on Earth." It's Walt Disney World's Magic Kindom in Orland, FL that calls itself "The Most Magical Place on Earth."<feedback>
<question>
```
        
> Do note, since feedback is intended to provide the user with additional insight into the question and its correct answer, feedback is not shown to the user until at least one (1) of the following conditions have been met:  
- If a question permits multiple attempts, feedback is given...
    1. When the user answers the question correctly
    2. When the user exhausts all permitted attempts
- If a question permits only one (1) attempt, feedback is given...
    1. After the user answers the question, regardless of right or wrong
- If a question permits an infinite number of attempts, feedback is given...
    1. Only after the user answers the question correctly



##### 6. Optionally, provide users with a hint:

###### Using HTML

In HTML, a hint can be added by creating a `<smarty-hint>` element. Additionally, the `data-attempts` property should be set on the `<smarty-hint>` element to specify how many attempts the user must try before the hint is made available. It's recommended that hints be added after all answer options and either before or after any question feedback:

```html
<smarty-question data-points="1" data-attempts="infinite" data-id="HTML" data-answer="false">
    Disneyland calls itself "The Most Magical Place on Earth."
    <smarty-feedback>
        California's Disneyland actually uses the motto, "The Happiest Place on Earth." It's Walt Disney World's Magic Kindom in Orland, FL that calls itself "The Most Magical Place on Earth."
    </smarty-feedback>
    <smarty-hint data-attempts="1">
        Disneyland is on the west coast, located in California. That's not to be confused with Disney World, which is located on the east coast in sunny Orlando, Florida. 
    </smarty-hint>
</smarty-question>
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr>
        <td>data-attempts</td>
        <td>*integer*</td>
        <td>1</td>
        <td>Setting this attribute with an *integer* value will set the minimum required number of attempts before the hint is given to the user.</td>
    </tr>
</table>
    
> Do note, since hints are intended to provide the user with guidance that may lead the user to the correct answer, hints are not shown to the user until a minimum number of attempts have been reached. To specify the number of attempts required before the user is able to receive hints, the `data-attempts` attribute is used on the `<smarty-hint>` element.

###### Using JSON

In JSON, a hint can be added by setting the `hint` property on a new line of the question object. Additionally, the `hintattempts` property should also be added on an a separate line of the question object to specify how many attempts the user must try before the hint is made available:

```json
{
    "question": "Disneyland calls itself \"The Most Magical Place on Earth.\"",
    "points": 1,
    "attempts": "infinite",
    "id": "JSON",
    "options": [true, false],
    "answer": false,
    "feedback": "California's Disneyland actually uses the motto, \"The Happiest Place on Earth.\" It's Walt Disney World's Magic Kindom in Orland, FL that calls itself \"The Most Magical Place on Earth.\"",
    "hint": "Disneyland is on the west coast, located in California. That's not to be confused with Disney World, which is located on the east coast in sunny Orlando, Florida. ",
    "hintattempts": 1
}
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr>
        <td>hintattempts</td>
        <td>*integer*</td>
        <td>1</td>
        <td>Setting this attribute with an *integer* value will set the minimum required number of attempts before the hint is given to the user.</td>
    </tr>
</table>
    
> Do note, since hints are intended to provide the user with guidance that may lead the user to the correct answer, hints are not shown to the user until a minimum number of attempts have been reached. To specify the number of attempts required before the user is able to receive hints, the `hintattempts` property is used.

###### Using XML

In XML, a hint can be added by creating a `<hint>` object. Additionally, the `attempts` property should be set on the `<hint>` object to specify how many attempts the user must try before the hint is made available:

```xml
<question points="1" attempts="infinite" id="XML">
    <question answer="false">Disneyland calls itself "The Most Magical Place on Earth."</question>
    <feedback>California's Disneyland actually uses the motto, "The Happiest Place on Earth." It's Walt Disney World's Magic Kindom in Orland, FL that calls itself "The Most Magical Place on Earth."<feedback>
    <hint attempts="1">Disneyland is on the west coast, located in California. That's not to be confused with Disney World, which is located on the east coast in sunny Orlando, Florida.</hint>
<question>
```
    
<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr>
        <td>data-attempts</td>
        <td>*integer*</td>
        <td>1</td>
        <td>Setting this attribute with an *integer* value will set the minimum required number of attempts before the hint is given to the user.</td>
    </tr>
</table>
    
> Do note, since hints are intended to provide the user with guidance that may lead the user to the correct answer, hints are not shown to the user until a minimum number of attempts have been reached. To specify the number of attempts required before the user is able to receive hints, the `attempts` attribute is used on the `<hint>` object.





### 5. Add Multimedia

While it's not recommended that multimedia be added to questions or answers directly, media, such as videos, images, and iframes, can be added to feedback and hints with ease. Of course, adding multimedia is always **optional**. 

###### Using HTML

It's recommended that multimedia be limited to question `<smarty-feedback>` or `<smarty-hint>` elements only in order to ensure the best possible results. When adding media in HTML, simply add the desired media object's markup where you wish to place the multimedia feature:

```html
<smarty-quiz>
    <smarty-question>
        ...
        <smarty-hint>
            <iframe src="http://youtube.com/..."></iframe>
        </smarty-hint>
    </smarty-question>
</smarty-quiz>
```

###### Using JSON

It's recommended that multimedia be limited to the question `feedback` or `hint` properties only in order to ensure the best possible results. When adding media in JSON, add the desired media object's markup as a string literal where you wish to place the multimedia feature. Because JSON syntax differs from HTML syntax, it's important to remember that double quotes placed inside a string literal should always be escaped with a backslash (`\`) in order to prevent unintentional early termination of the string. Alternatively, if your site is using HTML5, you can leave off double quotes inside your HTML markup altogether o wherever an attribute is limited to only one (1) value:

```json
[
    {
        ...,
        "hint": "<iframe src=\"http://youtube.com/...\"></iframe>"
    }
]

OR

[
    {
        ...,
        "hint": "<iframe src=http://youtube.com/...></iframe>"
    }
]
```

###### Using XML

It's recommended that multimedia be limited to question `<feedback>` or `<hint>` elements only in order to ensure the best possible results. When adding media in XML, any HTML markup must be wrapped inside a `<![CDATA[ ]]>` tag, which indicates that the text is HTML, not XML:

```xml
<quiz>
    <question>
        ...
        <hint>
            <![CDATA[
                <iframe src="http://youtube.com/..."></iframe>
            ]]>
        </hint>
    </question>
</quiz>
```

> Adding multimedia elsewhere other than in the recommended places above has not been tested and may cause unpredictable or unintended results.

## Creating Crosswords <a id="Crosswords"></a>

Smarty crosswords have been designed with the intent to help online learners acquire new knowledge in a fun way. Like traditional crossword puzzles, Smarty crosswords consist of a blank grid and clue set where online learners can fill in the grid with words or phrases based on the clues given. In order to create a Smarty crossword, follow the steps below:

### 1. Initialize the Element

Start by creating a `<smarty-crossword>` element in your HTML document:

```html
<smarty-crossword></smarty-crossword>
```


### 2. Set Your Preferences

Set your crossword's attributes to correspond with your preferences:

```html
<smarty-crossword data-title="Our Five Senses"
                  data-check="puzzle"></smarty-crossword>
```

<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>data-title</td>
        <td>*string*<br>
            *html*</td>
        <td>*null*</td>
        <td>By default, your crossword will not have a title until this attribute is declared with a *string* value. *HTML* values are also accepted.</td>
    </tr>
    <tr valign="top">
        <td>data-check</td>
        <td>puzzle<br>
            words<br>
            letters</td>
        <td>puzzle</td>
        <td>If set to *puzzle*, users must complete the entire crossword puzzle by filling in all blanks inside the grid before they will be able to check if their answers are correct. If set to *words*, each word will be checked automatically immediately after users complete any given word. if set to *letters*, each letter will be checked automatically immediately after users input any given letter value.</td>
    </tr>
    <tr valign="top">
        <td>data-file</td>
        <td>*file*.json<br>
            *file*.xml</td>
        <td>*null*</td>
        <td>The `data-file` attribute can optionally be used to supply question and answer data. The attribute accepts only two types of file formats, including *JSON* and *XML*. In order to use a *JSON* file, the `acceptJSON` configuration for crosswords in Smarty's JS file must be set to *true*. In order to use an *XML* file, the `acceptXML` configuration for crosswords in Smarty's JS file must be set to *true*. For more information on using *JSON* and *XML* data files, see the various methods for adding questions and answers below.</td>
    </tr>
</table>

### 4. Add Clues

Before setting up any clues in your Smarty crossword puzzle, your clues and answers will need to be made "Smarty-ready." This means, you'll need to prepare your clues and answers and lay them out in a crossword format before you'll be able to add them to your Smarty crossword puzzle. If you don't already have a set of clues and answers that are Smarty-ready, check out the <a href="#CluePrep">Prepping Your Clues</a> section below for tips and tricks on how to prepare clues for a Smarty crossword puzzle. If you already have a set of Smarty-ready clues, skip ahead to the section on <a href="#ClueSetup">Setting Up Your Clues</a>.

#### Prepping Your Clues <a id="CluePrep"></a>

##### 1. Start by identify the clues you will use and their respective answers:

<table cellpadding="2" cellspacing="2">
    <tr>
        <th width="80%">Clue</th>
        <th width="20%">Answer</th>
    </tr>
    <tr>
        <td>above your shoulders</td>
        <td>head</td>
    </tr>
    <tr>
        <td>below your head</td>
        <td>shoulder</td>
    </tr>
    <tr>
        <td>the halfway point of your legs</td>
        <td>knees</td>
    </tr>
    <tr>
        <td>on the end of your feet</td>
        <td>toes</td>
    </tr>
    <tr>
        <td>helps you see</td>
        <td>eyes</td>
    </tr>
    <tr>
        <td>helps you hear</td>
        <td>ears</td>
    </tr>
    <tr>
        <td>helps you talk</td>
        <td>mouth</td>
    </tr>
    <tr>
        <td>helps you smell</td>
        <td>nose</td>
    </tr>
</table>
    
##### 2. Use a spreadsheet or paper to lay your answers out in a crossword format: 

<style>
    .sample.crossword{ 
        border-collapse: collapse;
        font-size: 0.8em;
        width: 50vw;
        margin-bottom: calc(50vw / 10);
        text-transform: uppercase;
    }
    .sample.crossword td,
    .sample.crossword th{
        height: calc(50vw / 10 - 4px);
        border: 1px solid black;
    }
    .sample.crossword .strike{
        text-decoration: line-through;
    }
    .sample.crossword .num{
        font-weight: bold;
    } 
    .sample.crossword .x{
        background-color: rgba(0,0,255,0.1);
    }
    .sample.crossword .y{
        background-color: rgba(255,0,0,0.1);
    }
    .sample.crossword .x.y{
        background-color: rgba(255,0,255,0.1);
    }
    .sample.crossword .blank{
        background-color: rgba(0,0,0,0.2);
    }
    .sample.crossword .hylite{
        background-color: rgba(0,255,255,0.1);
    }
</style>

<table cellpadding="2" cellspacing="2" class="sample crossword">
    <tr align="center" valign="middle">
        <td width="10%">&#10003;</td>
        <td width="40%" class="strike">HEAD</td>
        <td width="10%">&#10003;</td>
        <td width="40%" class="strike">EYES</td>
    </tr>
    <tr align="center" valign="middle">
        <td>&#10003;</td>
        <td class="strike">shoulders</td>
        <td>&#10003;</td>
        <td class="strike">ears</td>
    </tr>
    <tr align="center" valign="middle">
        <td>&#10003;</td>
        <td class="strike">knees</td>
        <td>&#10003;</td>
        <td class="strike">mouth</td>
    </tr>
    <tr align="center" valign="middle">
        <td>&#10003;</td>
        <td class="strike">toes</td>
        <td>&#10003;</td>
        <td class="strike">nose</td>
    </tr>
</table>

<table cellpadding="2" cellspacing="2" class="sample crossword">
    <tr align="center" valign="middle">
        <td width="10%" class="num">0</td>
        <td width="10%" class="num x">1</td>
        <td width="10%" class="num x">2</td>
        <td width="10%" class="num x">3</td>
        <td width="10%" class="num x">4</td>
        <td width="10%" class="num x">5</td>
        <td width="10%" class="num x">6</td>
        <td width="10%" class="num x">7</td>
        <td width="10%" class="num x">8</td>
        <td width="10%" class="num x">9</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num y">1</td>
        <td class="blank"></td>
        <td>n</td>
        <td>o</td>
        <td>s</td>
        <td>e</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td>k</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num y">2</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td>h</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td>n</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num y">3</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td>m</td>
        <td>o</td>
        <td>u</td>
        <td>t</td>
        <td>h</td>
        <td class="blank"></td>
        <td>e</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num y">4</td>
        <td class="blank"></td>
        <td>e</td>
        <td class="blank"></td>
        <td>u</td>
        <td class="blank"></td>
        <td>o</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td>e</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num y">5</td>
        <td class="blank"></td>
        <td>y</td>
        <td class="blank"></td>
        <td>l</td>
        <td class="blank"></td>
        <td>e</td>
        <td>a</td>
        <td>r</td>
        <td>s</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num y">6</td>
        <td>h</td>
        <td>e</td>
        <td>a</td>
        <td>d</td>
        <td class="blank"></td>
        <td>s</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num y">7</td>
        <td class="blank"></td>
        <td>s</td>
        <td class="blank"></td>
        <td>e</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num y">8</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td>r</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num y">9</td>
        <td>t</td>
        <td>o</td>
        <td>e</td>
        <td>s</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
    </tr>
</table>

<table cellpadding="2" cellspacing="2" class="sample crossword">
    <tr align="center" valign="middle">
        <th colspan="2">Legend</th>
    </tr>
    <tr align="center" valign="middle">
        <td width="10%" class="num x"></td>
        <td width="90%">x-axis</td>
    </tr>
    <tr align="center" valign="middle">
        <td width="10%" class="num y"></td>
        <td width="90%">y-axis</td>
    </tr>
</table>

Alternatively, an online crossword puzzle generator can be used to help layout your answers in a crossword format. However, it's still recommended that afterwards you copy or recreate the layout in a spreadsheet application. This will allow you to accurately number the rows and columns of your crossword grid in the same manner as above, which you can then use to pinpoint word coordinates as detailed in the following step.
    
##### 3. Determine the starting coordinates of each word in your crossword grid: 

To help determine the starting coordinate of each word, number your crossword grid's columns and rows similar to the example above and below. The numbers for the x-axis (columns) should start on the left side of the grid and finish at the right. Likewise, the numbers for the y-axis (rows) should start at the top of the grid and end at the bottom. Once your grid is numbered, you can now proceed to pinpoint the starting coordinates for each word. The starting coordinates of each word should correlate to the horizontal (x) and vertical (y) position of the word's first letter, as represented in `X,Y` format.

<table cellpadding="2" cellspacing="2" class="sample crossword">
    <tr align="center" valign="middle">
        <td width="10%" class="num">0</td>
        <td width="10%" class="num">1</td>
        <td width="10%" class="num">2</td>
        <td width="10%" class="num">3</td>
        <td width="10%" class="num">4</td>
        <td width="10%" class="num">5</td>
        <td width="10%" class="num">6</td>
        <td width="10%" class="num">7</td>
        <td width="10%" class="num">8</td>
        <td width="10%" class="num">9</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">1</td>
        <td class="blank">1,1</td>
        <td class="hylite">2,1</td>
        <td>3,1</td>
        <td class="hylite">4,1</td>
        <td>5,1</td>
        <td class="blank">6,1</td>
        <td class="blank">7,1</td>
        <td class="blank">8,1</td>
        <td class="hylite">9,1</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">2</td>
        <td class="blank">1,2</td>
        <td class="blank">2,2</td>
        <td class="blank">3,2</td>
        <td>4,2</td>
        <td class="blank">5,2</td>
        <td class="blank">6,2</td>
        <td class="blank">7,2</td>
        <td class="blank">8,2</td>
        <td>9,2</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">3</td>
        <td class="blank">1,3</td>
        <td class="blank">2,3</td>
        <td class="hylite">3,3</td>
        <td>4,3</td>
        <td>5,3</td>
        <td class="hylite">6,3</td>
        <td>7,3</td>
        <td class="blank">8,3</td>
        <td>9,3</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">4</td>
        <td class="blank">1,4</td>
        <td class="hylite">2,4</td>
        <td class="blank">3,4</td>
        <td>4,4</td>
        <td class="blank">5,4</td>
        <td>6,4</td>
        <td class="blank">7,4</td>
        <td class="blank">8,4</td>
        <td>9,4</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">5</td>
        <td class="blank">1,5</td>
        <td>2,5</td>
        <td class="blank">3,5</td>
        <td>4,5</td>
        <td class="blank">5,5</td>
        <td class="hylite">6,5</td>
        <td>7,5</td>
        <td>8,5</td>
        <td>9,5</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">6</td>
        <td class="hylite">1,6</td>
        <td>2,6</td>
        <td>3,6</td>
        <td>4,6</td>
        <td class="blank">5,6</td>
        <td>6,6</td>
        <td class="blank">7,6</td>
        <td class="blank">8,6</td>
        <td class="blank">9,6</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">7</td>
        <td class="blank">1,7</td>
        <td>2,7</td>
        <td class="blank">3,7</td>
        <td>4,7</td>
        <td class="blank">5,7</td>
        <td class="blank">6,7</td>
        <td class="blank">7,7</td>
        <td class="blank">8,7</td>
        <td class="blank">9,7</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">8</td>
        <td class="blank">1,8</td>
        <td class="blank">2,8</td>
        <td class="blank">3,8</td>
        <td>4,8</td>
        <td class="blank">5,8</td>
        <td class="blank">6,8</td>
        <td class="blank">7,8</td>
        <td class="blank">8,8</td>
        <td class="blank">9,8</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">9</td>
        <td class="hylite">1,9</td>
        <td>2,9</td>
        <td>3,9</td>
        <td>4,9</td>
        <td class="blank">5,9</td>
        <td class="blank">6,9</td>
        <td class="blank">7,9</td>
        <td class="blank">8,9</td>
        <td class="blank">9,9</td>
    </tr>
</table>

<table cellpadding="2" cellspacing="2" class="sample crossword">
    <tr valign="middle" align="center">
        <th width="30%">Position</th>
        <th width="70%">Word</th>
    </tr>
    <tr valign="middle" align="center">
        <td width="30%" class="hylite">1,6</td>
        <td width="70%">head</td>
    </tr>
    <tr valign="middle" align="center">
        <td width="30%" class="hylite">4,1</td>
        <td width="70%">shoulders</td>
    </tr>
    <tr valign="middle" align="center">
        <td width="30%" class="hylite">9,1</td>
        <td width="70%">knees</td>
    </tr>
    <tr valign="middle" align="center">
        <td width="30%" class="hylite">6,3</td>
        <td width="70%">toes</td>
    </tr>
    <tr valign="middle" align="center">
        <td width="30%" class="hylite">2,4</td>
        <td width="70%">eyes</td>
    </tr>
    <tr valign="middle" align="center">
        <td width="30%" class="hylite">6,5</td>
        <td width="70%">ears</td>
    </tr>
    <tr valign="middle" align="center">
        <td width="30%" class="hylite">3,3</td>
        <td width="70%">mouth</td>
    </tr>
    <tr valign="middle" align="center">
        <td width="30%" class="hylite">2,1</td>
        <td width="70%">nose</td>
    </tr>
</table>
    
##### 4. Last, determine each word's direction as layed out in the crossword grid:

A word's direction can either be *across* (horizontal) or *down* (vertical). Words with all letters in a single row but each letter placed in a separate column are considered to be in the *across* direction. Likewise, words where all letters fall in a single column but each letter spans a different row is considered to be in the *down* direction.

<table cellpadding="2" cellspacing="2" class="sample crossword">
    <tr align="center" valign="middle">
        <td width="10%" class="num">0</td>
        <td width="10%" class="num">1</td>
        <td width="10%" class="num">2</td>
        <td width="10%" class="num">3</td>
        <td width="10%" class="num">4</td>
        <td width="10%" class="num">5</td>
        <td width="10%" class="num">6</td>
        <td width="10%" class="num">7</td>
        <td width="10%" class="num">8</td>
        <td width="10%" class="num">9</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">1</td>
        <td class="blank"></td>
        <td class="x">n</td>
        <td class="x">o</td>
        <td class="x y">s</td>
        <td class="x">e</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="y">k</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">2</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="y">h</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="y">n</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">3</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="x">m</td>
        <td class="y x">o</td>
        <td class="x">u</td>
        <td class="y x">t</td>
        <td class="x">h</td>
        <td class="blank"></td>
        <td class="y">e</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">4</td>
        <td class="blank"></td>
        <td class="y">e</td>
        <td class="blank"></td>
        <td class="y">u</td>
        <td class="blank"></td>
        <td class="y">o</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="y">e</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">5</td>
        <td class="blank"></td>
        <td class="y">y</td>
        <td class="blank"></td>
        <td class="y">l</td>
        <td class="blank"></td>
        <td class="y x">e</td>
        <td class="x">a</td>
        <td class="x">r</td>
        <td class="y x">s</td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">6</td>
        <td class="x">h</td>
        <td class="x y">e</td>
        <td class="x">a</td>
        <td class="x y">d</td>
        <td class="blank"></td>
        <td class="y">s</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">7</td>
        <td class="blank"></td>
        <td class="y">s</td>
        <td class="blank"></td>
        <td class="y">e</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">8</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="y">r</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
    </tr>
    <tr align="center" valign="middle">
        <td class="num">9</td>
        <td class="x">t</td>
        <td class="x">o</td>
        <td class="x">e</td>
        <td class="y x">s</td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
        <td class="blank"></td>
    </tr>
</table>

<table cellpadding="2" cellspacing="2" class="sample crossword">
    <tr valign="middle" align="center">
        <th width="30%">Direction</th>
        <th width="70%">Word</th>
    </tr>
    <tr valign="middle" align="center">
        <td width="30%" class="x">across</td>
        <td width="70%">head</td>
    </tr>
    <tr valign="middle" align="center">
        <td width="30%" class="y">down</td>
        <td width="70%">shoulders</td>
    </tr>
    <tr valign="middle" align="center">
        <td width="30%" class="y">down</td>
        <td width="70%">knees</td>
    </tr>
    <tr valign="middle" align="center">
        <td width="30%" class="y">down</td>
        <td width="70%">toes</td>
    </tr>
    <tr valign="middle" align="center">
        <td width="30%" class="y">down</td>
        <td width="70%">eyes</td>
    </tr>
    <tr valign="middle" align="center">
        <td width="30%" class="x">across</td>
        <td width="70%">ears</td>
    </tr>
    <tr valign="middle" align="center">
        <td width="30%" class="x">across</td>
        <td width="70%">mouth</td>
    </tr>
    <tr valign="middle" align="center">
        <td width="30%" class="x">across</td>
        <td width="70%">nose</td>
    </tr>
</table>

    
#### Setting Up Your Clues <a id="ClueSetup"></a>

##### 1. Start adding clues to  your crossword puzzle:

###### Using HTML

For each clue you wish to add to your crossword puzzle, create a separate `<smarty-clue>` element. Each `<smarty-clue>` element will hold both the clue's prompt and answer as detailed in subsequent steps. In the example below, a set of eight (8) blank clues are created:

```html
<smarty-crossword>
    <smarty-clue></smarty-clue>
    <smarty-clue></smarty-clue>
    <smarty-clue></smarty-clue>
    <smarty-clue></smarty-clue>
    <smarty-clue></smarty-clue>
    <smarty-clue></smarty-clue>
    <smarty-clue></smarty-clue>
    <smarty-clue></smarty-clue>
</smarty-quiz>
```
    
###### Using JSON

Create your base JSON data file using an array (`[]`). For each clue you wish to add to your crossword data file, create a new object (`{}`) inside the array. The example below inserts eight (8) blank objects in preparation for a total of eight (8) clues:

```json
    [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
    ]
```

###### Using XML

For XML data files, the basic structure should resemble that of our HTML document but using a `<crossword>` object instead of a `<smarty-crossword>` element. Clues are then added to the `<crossword>` element using `<clue>` elements as shown below:

```xml
<crossword>
    <clue></clue>
    <clue></clue>
    <clue></clue>
    <clue></clue>
    <clue></clue>
    <clue></clue>
    <clue></clue>
    <clue></clue>
</crossword>
```


##### 2. Next, add prompts to clues:

###### Using HTML

In your HTML document, prompts can then be added as text inside each of your `<smarty-clue>` elements:

```html
<smarty-crossword>
    <smarty-clue>
        above your shoulders
    </smarty-clue>
    <smarty-clue>
        below your head
    </smarty-clue>
    <smarty-clue>
        the halfway point of your legs
    </smarty-clue>
    <smarty-clue>
        on the end of your feet
    </smarty-clue>
    <smarty-clue>
        helps you see
    </smarty-clue>
    <smarty-clue>
        helps you hear
    </smarty-clue>
    <smarty-clue>
        helps you talk
    </smarty-clue>
    <smarty-clue>
        helps you smell
    </smarty-clue>
</smarty-quiz>
```

###### Using JSON

In JSON, prompts are added as strings to each clue object using the `prompt` property:

```json
[
    {
        "prompt": "above your shoulders"
    },
    {
        "prompt": "below your head"
    },
    {
        "prompt": "the halfway point of your legs"
    },
    {
        "prompt": "on the end of your feet"
    },
    {
        "prompt": "helps you see"
    },
    {
        "prompt": "helps you hear"
    },
    {
        "prompt": "helps you talk"
    },
    {
        "prompt": "helps you smell"
    }
]
```

###### Using XML

In XML, prompts can be added to each of you `<clue>` objects using a nested `<prompt>` element with your prompt text inside:

```xml
<crossword>
    <clue>
        <prompt>above your shoulders</prompt>
    </clue>
    <clue>
        <prompt>below your head</prompt>
    </clue>
    <clue>
        <prompt>the halfway point of your legs</prompt>
    </clue>
    <clue>
        <prompt>on the end of your feet</prompt>
    </clue>
    <clue>
        <prompt>helps you see</prompt>
    </clue>
    <clue>
        <prompt>helps you hear</prompt>
    </clue>
    <clue>
        <prompt>helps you talk</prompt>
    </clue>
    <clue>
        <prompt>helps you smell</prompt>
    </clue>
</crossword>
```

    
    
##### 3. Then, add each clue's respective answer:

###### Using HTML

In HTML, each clue's respective answer can be added using the `data-answer` attribute:

```html
<smarty-crossword>
    <smarty-clue data-answer="head">
        above your shoulders
    </smarty-clue>
    <smarty-clue data-answer="shoulders">
        below your head
    </smarty-clue>
    <smarty-clue data-answer="knees">
        the halfway point of your legs
    </smarty-clue>
    <smarty-clue data-answer="toes">
        on the end of your feet
    </smarty-clue>
    <smarty-clue data-answer="eyes">
        helps you see
    </smarty-clue>
    <smarty-clue data-answer="ears">
        helps you hear
    </smarty-clue>
    <smarty-clue data-answer="mouth">
        helps you talk
    </smarty-clue>
    <smarty-clue data-answer="nose">
        helps you smell
    </smarty-clue>
</smarty-quiz>
```

###### Using JSON

Similar to the `prompt` property, clue answers in JSON are added to each clue object using the `answer` property:

```json
[
    {
        "prompt": "above your shoulders",
        "answer": "head"
    },
    {
        "prompt": "below your head",
        "answer": "shoulders"
    },
    {
        "prompt": "the halfway point of your legs",
        "answer": "knees"
    },
    {
        "prompt": "on the end of your feet",
        "answer": "toes"
    },
    {
        "prompt": "helps you see",
        "answer": "eyes"
    },
    {
        "prompt": "helps you hear",
        "answer": "ears"
    },
    {
        "prompt": "helps you talk",
        "answer": "mouth"
    },
    {
        "prompt": "helps you smell",
        "answer": "nose"
    }
]
```

###### Using XML

In XML, each clue's respective answer can be added to the `<clue>` element using the `answer` attribute:

```xml
<crossword>
    <clue answer="head">
        <prompt>above your shoulders</prompt>
    </clue>
    <clue answer="shoulders">
        <prompt>below your head</prompt>
    </clue>
    <clue answer="knees">
        <prompt>the halfway point of your legs</prompt>
    </clue>
    <clue answer="toes">
        <prompt>on the end of your feet</prompt>
    </clue>
    <clue answer="eyes">
        <prompt>helps you see</prompt>
    </clue>
    <clue answer="ears">
        <prompt>helps you hear</prompt>
    </clue>
    <clue answer="mouth">
        <prompt>helps you talk</prompt>
    </clue>
    <clue answer="nose">
        <prompt>helps you smell</prompt>
    </clue>
</crossword>
```


##### 4. Set each clue's position equal to the word's starting coordinates:

###### Using HTML

With your Smarty-ready clues, you should now be ready to setup your clues' location within the crossword grid. To assign clues to a starting position, use the `data-position` attribute on the `<smarty-clue>` element. The `data-position` attribute value should use standard coordinate notation (`x,y`), where the `x` value is equivalent to the word's starting horizontal position and the `y` value is equivalent to the word's starting vertical position within the crossword grid:

```html
<smarty-crossword>
    <smarty-clue data-answer="head" 
                 data-position="1,6">
        above your shoulders
    </smarty-clue>
    <smarty-clue data-answer="shoulders" 
                 data-position="4,1">
        below your head
    </smarty-clue>
    <smarty-clue data-answer="knees"
                 data-position="9,1">
        the halfway point of your legs
    </smarty-clue>
    <smarty-clue data-answer="toes"
                 data-position="6,3">
        on the end of your feet
    </smarty-clue>
    <smarty-clue data-answer="eyes"
                 data-position="2,4">
        helps you see
    </smarty-clue>
    <smarty-clue data-answer="ears"
                 data-position="6,5">
        helps you hear
    </smarty-clue>
    <smarty-clue data-answer="mouth"
                 data-position="3,3">
        helps you talk
    </smarty-clue>
    <smarty-clue data-answer="nose"
                 data-position="2,1">
        helps you smell
    </smarty-clue>
</smarty-quiz>
```
    
> The `data-position` attribute, in conjunction with the `data-direction` attribute in the following step, will allow Smarty to properly position your words on the crossword grid. Therefore, the order of your `<smarty-clue>` elements within your crossword is irrelevant. 

###### Using JSON

With your Smarty-ready clues, you should now be ready to setup your clues' location within the crossword grid. To assign clues to a starting position, set the `position` property on each clue object in your JSON data file. The `data-position` attribute value should use a two-value array in the format of `[x,y]`, where the first value is equivalent to the word's starting horizontal position (`x`) and the second value is equivalent to the word's starting vertical position (`y`) within the crossword grid:

```json
[
    {
        "prompt": "above your shoulders",
        "answer": "head",
        "position": [1,6]
    },
    {
        "prompt": "below your head",
        "answer": "shoulders",
        "position": [4,1]
    },
    {
        "prompt": "the halfway point of your legs",
        "answer": "knees",
        "position": [9,1]
    },
    {
        "prompt": "on the end of your feet",
        "answer": "toes":
        "position": [6,3]
    },
    {
        "prompt": "helps you see",
        "answer": "eyes",
        "position": [2,4]
    },
    {
        "prompt": "helps you hear",
        "answer": "ears",
        "position": [6,5]
    },
    {
        "prompt": "helps you talk",
        "answer": "mouth",
        "position": [3,3]
    },
    {
        "prompt": "helps you smell",
        "answer": "nose",
        "posiiton": [2,1]
    }
]
```

> The `position` property, in conjunction with the `direction` property in the following step, will allow Smarty to properly position your words on the crossword grid. Therefore, the order of your clue objects within your crossword array is irrelevant. 

###### Using XML

With your Smarty-ready clues, you should now be ready to setup your clues' location within the crossword grid. To assign clues to a starting position, use the `position` attribute on the `<clue>` element. The `data-position` attribute value should use standard coordinate notation (`x,y`), where the `x` value is equivalent to the word's starting horizontal position and the `y` value is equivalent to the word's starting vertical position within the crossword grid:

```xml
<crossword>
    <clue answer="head" position="1,6">
        <prompt>above your shoulders</prompt>
    </clue>
    <clue answer="shoulders" position="4,1">
        <prompt>below your head</prompt>
    </clue>
    <clue answer="knees" position="9,1">
        <prompt>the halfway point of your legs</prompt>
    </clue>
    <clue answer="toes" position="6,3">
        <prompt>on the end of your feet</prompt>
    </clue>
    <clue answer="eyes" position="2,4">
        <prompt>helps you see</prompt>
    </clue>
    <clue answer="ears" position="6,5">
        <prompt>helps you hear</prompt>
    </clue>
    <clue answer="mouth" position="3,3">
        <prompt>helps you talk</prompt>
    </clue>
    <clue answer="nose" position="2,1">
        <prompt>helps you smell</prompt>
    </clue>
</crossword>
```

> The `position` attribute, in conjunction with the `direction` attribute in the following step, will allow Smarty to properly position your words on the crossword grid. Therefore, the order of your `<clue>` objects within your crossword is irrelevant. 


##### 5. Set the direction for each clue's word within the crossword grid:

###### Using HTML

Set each clue's direction using the `data-direction` attribute on the `<smarty-clue>` element. Valid direction values are either *down* or *across*:

```html
<smarty-crossword>
    <smarty-clue data-answer="head" 
                 data-position="1,6"
                 data-direction="across">
        above your shoulders
    </smarty-clue>
    <smarty-clue data-answer="shoulders" 
                 data-position="4,1"
                 data-direction="down">
        below your head
    </smarty-clue>
    <smarty-clue data-answer="knees"
                 data-position="9,1"
                 data-direction="down">
        the halfway point of your legs
    </smarty-clue>
    <smarty-clue data-answer="toes"
                 data-position="6,3"
                 data-direction="down">
        on the end of your feet
    </smarty-clue>
    <smarty-clue data-answer="eyes"
                 data-position="2,4"
                 data-direction="down">
        helps you see
    </smarty-clue>
    <smarty-clue data-answer="ears"
                 data-position="6,5"
                 data-direction="across">
        helps you hear
    </smarty-clue>
    <smarty-clue data-answer="mouth"
                 data-position="3,3"
                 data-direction="across">
        helps you talk
    </smarty-clue>
    <smarty-clue data-answer="nose"
                 data-position="2,1"
                 data-direction="across">
        helps you smell
    </smarty-clue>
</smarty-quiz>
```

> The `data-direction` attribute, in conjunction with the `data-position` attribute above, will allow Smarty to properly position your words on the crossword grid. Therefore, the order of your `<smarty-clue>` elements within your crossword is irrelevant. 

###### Using JSON

Set each clue's direction by using the `direction` property on a new line of the clue object. Valid direction values are either *down* or *across*:

```json
[
    {
        "prompt": "above your shoulders",
        "answer": "head",
        "position": [1,6],
        "direction": "across"
    },
    {
        "prompt": "below your head",
        "answer": "shoulders",
        "position": [4,1],
        "direction": "down"
    },
    {
        "prompt": "the halfway point of your legs",
        "answer": "knees",
        "position": [9,1],
        "direction": "down"
    },
    {
        "prompt": "on the end of your feet",
        "answer": "toes":
        "position": [6,3],
        "direction": "down"
    },
    {
        "prompt": "helps you see",
        "answer": "eyes",
        "position": [2,4],
        "direction": "down"
    },
    {
        "prompt": "helps you hear",
        "answer": "ears",
        "position": [6,5],
        "direction": "across"
    },
    {
        "prompt": "helps you talk",
        "answer": "mouth",
        "position": [3,3],
        "direction": "across"
    },
    {
        "prompt": "helps you smell",
        "answer": "nose",
        "posiiton": [2,1],
        "direction": "across"
    }
]
```

> The `position` property, in conjunction with the `direction` property in the following step, will allow Smarty to properly position your words on the crossword grid. Therefore, the order of your clue objects within your crossword array is irrelevant. 

###### Using XML

Set each clue's direction using the `direction` attribute on the `<clue>` element. Valid direction values are either *down* or *across*:

```xml
<crossword>
    <clue answer="head" position="1,6" direction="across">
        <prompt>above your shoulders</prompt>
    </clue>
    <clue answer="shoulders" position="4,1" direction="down">
        <prompt>below your head</prompt>
    </clue>
    <clue answer="knees" position="9,1" direction="down">
        <prompt>the halfway point of your legs</prompt>
    </clue>
    <clue answer="toes" position="6,3" direction="down">
        <prompt>on the end of your feet</prompt>
    </clue>
    <clue answer="eyes" position="2,4" direction="down">
        <prompt>helsp you see</prompt>
    </clue>
    <clue answer="ears" position="6,5" direction="across">
        <prompt>helps you hear</prompt>
    </clue>
    <clue answer="mouth" position="3,3" direction="across">
        <prompt>helps you talk</prompt>
    </clue>
    <clue answer="nose" position="2,1" direction="across">
        <prompt>helps you smell</prompt>
    </clue>
</crossword>
```

> The `position` attribute, in conjunction with the `direction` attribute in the following step, will allow Smarty to properly position your words on the crossword grid. Therefore, the order of your `<clue>` objects within your crossword is irrelevant. 


## Creating Flashcards <a id="Flashcards"></a>

Flashcards can be used as an interactive learning tool to help online learners study new topics and improve their memory. Just like a traditional set of flashcards, Smarty flashcards are designed to be two-sided with a prompt on the front and answer on the back, where either side can be accessed by flipping the card. In order to create a set of Smarty flashcards, follow the steps below:

### 1. Initialize the Element

Start by creating a `<smarty-flashcard>` element in your HTML document:

```html
<smarty-flashcard></smarty-flashcard>
```
   
### 2. Set Your Preferences

Set your quiz's attributes to correspond with your preferences:

<table cellpadding="2" cellspacing="2">
    <tr align="left">
        <th width="20%">Attribute</th>
        <th width="20%">Options</th>
        <th width="20%">Default</th>
        <th width="40%">Description</th>
    </tr>
    <tr valign="top">
        <td>data-title</td>
        <td>*string*<br>
            *html*</td>
        <td>*null*</td>
        <td>By default, your flashcards will not have a title until this attribute is declared with a *string* value. *HTML* values are also accepted.</td>
    </tr>
        <tr valign="top">
        <td>data-flipback</td>
        <td>true<br>
            false</td>
        <td>true</td>
        <td>If set to *true*, when the user changes cards, the last card viewed will flip back to its initial side regardless of whether the card was on its front or back side. If set to *false*, when the user changes cards, the last card viewed will not flip back to its initial side, instead remaining on the side the user toggled last.</td>
    </tr>
    <tr valign="top">
        <td>data-side</td>
        <td>front<br>
            back</td>
        <td>front</td>
        <td>If set to *front*, users will initially see the front side of all flashcards.  Furthermore, if *front* is used in conjunction with `data-flipback="true"`, then previously viewed cards will be flipped back to their front face after the user changes cards. If set to *back*, users will initially see the back side of all flashcards. If *back* is used in conjunction with `data-flipback="true"`, then previously viewed cards will be flipped back to their back face after the user changes cards.</td>
    </tr>
    <tr valign="top">
        <td>data-rotate</td>
        <td>vertical<br>
            horizontal</td>
        <td>vertical</td>
        <td>If set to *vertical*, when a flip is initiated by the user, cards will rotate along their vertical (y) axis. If set to *horizontal*, when a flip is initiated by the user, cards will rotate along their horizontal (x) axis.</td>
    </tr>
    <tr valign="top">
        <td>data-file</td>
        <td>*file*.json<br>
            *file*.xml</td>
        <td>*null*</td>
        <td>The `data-file` attribute can optionally be used to supply question and answer data. The attribute accepts only two types of file formats, including *JSON* and *XML*. In order to use a *JSON* file, the `acceptJSON` configuration for flashcards in Smarty's JS file must be set to *true*. In order to use an *XML* file, the `acceptXML` configuration for flashcards in Smarty's JS file must be set to *true*. For more information on using *JSON* and *XML* data files, see the various methods for adding questions and answers below.</td>
    </tr>
</table>

### 3. Add Cards

Traditional flashcards consist of both a front and back face. With Smarty cards, the front face of a flashcard will always represent to the card's prompt, and the back of the flashcard will always equate to the card's answer. Smarty flashcards have been setup to make the process of create cards easy, as outlined in the steps below:

##### 1. Start by creating cards:

###### Using HTML

In HTML, cards can be created using the `<smarty-card>` element. In the example below, a total of four (4) blank cards are createds:

```html
<smarty-flashcard>
    <smarty-card></smarty-card>
    <smarty-card></smarty-card>
    <smarty-card></smarty-card>
    <smarty-card></smarty-card>
</smarty-flashcard>
```

###### Using JSON

Create your base JSON data file using an array (`[]`). For each card you wish to add to your flashcard data file, create a new object (`{}`) inside the array. The example below inserts four (4) blank objects in preparation for a total of four (4) cards:

```json
    [
        {},
        {},
        {},
        {}
    ]
```

###### Using XML

For XML data files, the basic structure should resemble that of our HTML document but using a `<flashcard>` object instead of a `<smarty-flashcard>` element. Cards are then added to the `<flashcard>` element using `<card>` elements as shown below:

```xml
<flashcard>
    <card></card>
    <card></card>
    <card></card>
    <card></card>
</flashcard>
```

    
    
##### 2. Next, add a prompt to each card prompt:

###### Using HTML

In your HTML document, prompts can then be added as text inside each of your `<smarty-card>` elements:

```html
<smarty-flashcard>
    <smarty-card>1 + 1</smarty-card>
    <smarty-card>2 + 2</smarty-card>
    <smarty-card>3 + 3</smarty-card>
    <smarty-card>4 + 4</smarty-card>
</smarty-flashcard>
```

###### Using JSON

In JSON, prompts are added as strings to each card object using the `prompt` property:

```json
[
    {
        "prompt": "1 + 1"
    },
    {
        "prompt": "2 + 2"
    },
    {
        "prompt": "3 + 3"
    },
    {
        "prompt": "4 + 4"
    }
]
```

###### Using XML

In XML, prompts can be added to each of you `<card>` objects using a nested `<prompt>` element with your prompt text inside:

```xml
<flashcard>
    <card>
        <prompt>1 + 1</prompt>
    </card>
    <card>
        <prompt>2 + 2</prompt>
    </card>
    <card>
        <prompt>3 + 3</prompt>
    </card>
    <card>
        <prompt>4 + 4</prompt>
    </card>
</flashcard>
```

##### 3. Then, add each clue's respective answer:

###### Using HTML

In HTML, each clue's respective answer can be added using the `data-answer` attribute:

```html
<smarty-flashcard>
    <smarty-card data-answer="2">1 + 1</smarty-card>
    <smarty-card data-answer="4">2 + 2</smarty-card>
    <smarty-card data-answer="6">3 + 3</smarty-card>
    <smarty-card data-answer="8">4 + 4</smarty-card>
</smarty-flashcard>
```

###### Using JSON

Similar to the `prompt` property, clue answers in JSON are added to each clue object using the `answer` property:

```json
[
    {
        "prompt": "1 + 1",
        "answer": "2"
    },
    {
        "prompt": "2 + 2",
        "answer": "4"
    },
    {
        "prompt": "3 + 3",
        "answer": "6"
    },
    {
        "prompt": "4 + 4",
        "answer": "8"
    }
]
```

###### Using XML

In XML, each card's respective answer can be added to the `<card>` element using the `answer` attribute:

```xml
<flashcard>
    <card answer="2">
        <prompt>1 + 1</prompt>
    </card>
    <card answer="4">
        <prompt>2 + 2</prompt>
    </card>
    <card answer="6">
        <prompt>3 + 3</prompt>
    </card>
    <card answer="8">
        <prompt>4 + 4</prompt>
    </card>
</flashcard>
```

##### 4. Optionally, add extra information about a card's answer:

###### Using HTML
    
Additional information to give further insight into a card's answer can be added to `<smarty-card>` element using a `<smarty-info>` element: 

```html
<smarty-flashcard>
    <smarty-card data-answer="2">
        1 + 1
    </smarty-card>
    <smarty-card data-answer="4">
        2 + 2
    </smarty-card>
    <smarty-card data-answer="6">
        3 + 3
    </smarty-card>
    <smarty-card data-answer="8">
        4 + 4
        <smarty-info>
            Who do we appreciate?
        </smarty-info>
    </smarty-card>
</smarty-flashcard>
```
    
> The information contained in a card's `<smarty-info>` element is only made accessible when the user flips the card to the side with the card's answer (back). When a card has additional information that the user can read, a clickable notification will appear. When the user clicks the notification, a reading pane will be toggled where the user can then read through the information provided. Clicking the notification a second time will toggle the reading pane yet again, only this time hiding it from the user's view.

###### Using JSON

Additional information to give further insight into a card's answer can be added to cards by setting the `info` property on a new line of each card object: 

```json
[
    {
        "prompt": "1 + 1",
        "answer": "2"
    },
    {
        "prompt": "2 + 2",
        "answer": "4"
    },
    {
        "prompt": "3 + 3",
        "answer": "6"
    },
    {
        "prompt": "4 + 4",
        "answer": "8",
        "info": "Who do we appreciate?"
    }
]
```
    
> The information contained in a card's `<smarty-info>` element is only made accessible when the user flips the card to the side with the card's answer (back). When a card has additional information that the user can read, a clickable notification will appear. When the user clicks the notification, a reading pane will be toggled where the user can then read through the information provided. Clicking the notification a second time will toggle the reading pane yet again, only this time hiding it from the user's view.

###### Using XML

Additional information to give further insight into a card's answer can be added to `<card>` object using an `<info>` element: 

```xml
<flashcard>
    <card answer="2">
        <prompt>1 + 1</prompt>
    </card>
    <card answer="4">
        <prompt>2 + 2</prompt>
    </card>
    <card answer="6">
        <prompt>3 + 3</prompt>
    </card>
    <card answer="8">
        <prompt>4 + 4</prompt>
        <info>Who do we appreciate?</info>
    </card>
</flashcard>
```
    
> The information contained in a card's `<smarty-info>` element is only made accessible when the user flips the card to the side with the card's answer (back). When a card has additional information that the user can read, a clickable notification will appear. When the user clicks the notification, a reading pane will be toggled where the user can then read through the information provided. Clicking the notification a second time will toggle the reading pane yet again, only this time hiding it from the user's view.

### 4. Add Multimedia

While it's not recommended that multimedia be added to cards directly, media, such as videos, images, and iframes, can be added to any card's info with ease. Of course, adding multimedia is always **optional**. 

###### Using HTML

It's recommended that multimedia be limited to card's `<smarty-info>` element only in order to ensure the best possible results. When adding media in HTML, simply add the desired media object's markup where you wish to place the multimedia feature:

```html
<smarty-flashcard>
    <smarty-card>
        ...
        <smarty-info>
            <iframe src="http://youtube.com/..."></iframe>
        </smarty-info>
    </smarty-card>
</smarty-flashcard>
```

###### Using JSON

It's recommended that multimedia be limited to a card's `info` property only in order to ensure the best possible results. When adding media in JSON, add the desired media object's markup as a string literal where you wish to place the multimedia feature. Because JSON syntax differs from HTML syntax, it's important to remember that double quotes placed inside a string literal should always be escaped with a backslash (`\`) in order to prevent unintentional early termination of the string. Alternatively, if your site is using HTML5, you can leave off double quotes inside your HTML markup altogether o wherever an attribute is limited to only one (1) value:

```json
[
    {
        ...,
        "info": "<iframe src=\"http://youtube.com/...\"></iframe>"
    }
]

OR

[
    {
        ...,
        "info": "<iframe src=http://youtube.com/...></iframe>"
    }
]
```

###### Using XML

It's recommended that multimedia be limited to a card's `<info>` element only in order to ensure the best possible results. When adding media in XML, any HTML markup must be wrapped inside a `<![CDATA[ ]]>` tag, which indicates that the text is HTML, not XML:

```xml
<flashcard>
    <card>
        ...
        <info>
            <![CDATA[
                <iframe src="http://youtube.com/..."></iframe>
            ]]>
        </info>
    </card>
</flashcard>
```

> Adding multimedia elsewhere other than in the recommended places above has not been tested and may cause unpredictable or unintended results.

