 (function(factory){
  window.myMathlib = factory({});
}

(function(myMathlib){

// categrogies of button on calculator. Some function button has its own function and special category

//such as ^ sin cos tan....
  var dictionary = [
    {
      char : ['0','1','2','3','4','5','6','7','8','9'],
      data : {
        'type' : 'number'
      }
    },
    {
      char : ['+','-','*','/'],
      data : {
        'type' : 'operator'
      }
    },
    {
      char : ['('],
      data : {
        'type' : 'begin-bracket'
      }
    },
    {
      char : [')'],
      data : {
        'type' : 'end-bracket'
      }
    },
    {
      char : ['^'],
      data : {
        'type' : 'functionTypeA',
        'function' : "Math.pow",
      }
    },
    {
      char : ['Sin'],
      data : {
        'type' : 'functionTypeB',
        'function' : "Math.sin",
      }
    },
    {
      char : ['Cos'],
      data : {
        'type' : 'functionTypeB',
        'function' : "Math.cos",
      }
    },
    {
      char : ['Tan'],
      data : {
        'type' : 'functionTypeB',
        'function' : "Math.tan",
      }
    },
    {
      char : ['PI'],
      data : {
        'type' : 'functionTypeC',
        'function' : "Math.PI",
      }
    },
    {
      char : ['CA'],
      data : {
        'type' : 'Clear'
      }
    },
    {
      char : ['<-'],
      data : {
        'type' : 'Clear'
      }
    }
  ];



  var buffer = [];
  //this string should be compatible with eval
  var translation = [];
  var newUnit = true;
  var firstUnit = true;

  //problem:
  //paramStartIndex can change when more functions are insert, we need to update each paramStartIndex
  /*
  var functionMapping = [
    {
      'function' : 'Math.pow',
      'functionName' : 'FUNC_0',
      'type' : 'functionTypeA'
      'paramStartIndex' : 10,
      'insertLength' : 2,
      'open' : true
    }
  ] */
  var functionMapping = [];
  var paramStartIndex = 0;

// hit structure begin

//lets use ^ as example, to go through all the code
  myMathlib.hit = function(char){
    // char = ^
    // we pass ^ to findInDictionary
    var currentKey = findInDictionary(char);
     /*currentKey is an object

     [
       type : functionTypeA,
       function : Math.pow

   ]

    */
    console.log("char is " + char );
    if (currentKey) {
        var lastKey = (buffer.length > 0) ?  buffer[buffer.length-1] : false;

        //we should group number together as a unit
        // following is correct, cuz our char is not number
        if (lastKey) {
          if (lastKey.type=='number' && currentKey.type == 'number') {
            newUnit = false;
          } else {
            newUnit = true;
          }
        }
        if (newUnit) {
          if (lastKey) {
            if (firstUnit == false && lastKey.type =='number') {
                translation.push(')');
            }
          }
          if (currentKey.type == 'number') {
            translation.push('(');
            firstUnit = false;
          }
        }
        currentKey.char = char;
        console.log("current key is below ");
        console.log(currentKey);
        buffer.push(currentKey);
       if (currentKey.type == "functionTypeA") {
         console.log("^ is read");

       }
        closeFunctionCheck();
      //  console.log("after closefunctioncheck, array function mapping is" + functionMapping.join(""));
        switch (currentKey.type) {
          case 'functionTypeA':
            console.log("^ is type A, so we swich to function type A");
            translateFunctionTypeA(currentKey.function);

            break;
          case 'functionTypeB':
            translateFunctionTypeB(currentKey.function);
            break;
          case 'functionTypeC':
            translation.push(currentKey.function);
            break;
          case 'Clear':
            clear(char);
            break;
          default:
            translation.push(char);
            console.log("our expreesion is " + translation.join(""));
            break;
        }
        //***debug message
        //console.log(translation.join(''));
        /*
        if (functionMapping.length > 0) {
          console.log('functionMapping: '+JSON.stringify(functionMapping));
        }
        */
    }
  }
  /************************************
  translateFunctionTypeA:
    functionTypeA  requires 2 parameters,
        first parameter is the expression prior to the function operator
        2nd parameter is the expression after the function operator
  *****************************************/
  function findInDictionary(char) {
    // ^ is pass into this function
    var output = false;
    for (var i=0;i<dictionary.length;i++) {
      var characters = dictionary[i].char;
      // char is an array, we check that element is in that array or not, if not, we go to next array
      if (characters.indexOf(char) > -1) {
        // once we know which array is, we pass the object "data" to output
        /*
          so in this example, output is an object, contain attribute called type, inside type we got number


          if char is ^, we got data : {
            'type' : 'functionTypeA',
            'function' : "Math.pow",
          }

          output is object, contain attribute called type and funciton, and we got functiontpe B in type, and Math.sin in function
          */
        output = dictionary[i].data;
        /* output is like [
          type : functionTypeA,
          function : Math.pow

      ]*/
        break;
      }
    }
    return output;
  }
  function clear(char){
    console.log("inside  clear function");
    switch (char) {
      case 'CA':
        init();
        break;
      case '<-':
      console.log("inside  <- function");
        translation = [];
        newUnit = true;
        firstUnit = true;
        functionMapping = [],
        paramStartIndex = 0;
        buffer.pop();
        var tempBuffer = buffer;
        buffer = [];
        var length = tempBuffer.length;
        for (var i = 0; i < length; i++) {
          myMathlib.hit(tempBuffer[i].char);
        }
        console.log("translation is " + translation);
      default:
      break;

    }
  }
  function translateFunctionTypeA(func) {
    var count = 0;
    var index = 0;
    var functionName = 'FUNC_'+functionMapping.length;
    console.log(" in function translatefunctiontypeA, functionName " + functionName);
    for (var i=translation.length-1; i >=0; i=i-1) {
      var char = translation[i];
      if (char == ')') {
        count++;
      }
      if (char == '(') {
        count -= 1;
      }
      if (count == 0) {
        index = i;
        break;
      }
    }

    //console.log(translation);
    //console.log(index);
    if (index > 0) {
      //we dont want function to insert between   FUNC_ and (
      if (translation[index-1].indexOf('FUNC_') > -1) {
        index = index+1;
      }
    }

    translation.splice(index,0,functionName,'(');
    translation.push(',');
    insertFunction({
      'function' : func,
      'functionName' : functionName,
      'type' : 'functionTypeA',
      'paramStartIndex' : translation.length-1,
      'insertLength' : 2,
      'open' : true
    });
    return;
  }

  function translateFunctionTypeB(func) {
    var count = 0;
    var index = 0;
    var functionName = 'FUNC_'+functionMapping.length;
    console.log(" in function translatefunctiontypeB, functionName " + functionName);

    //console.log(translation);
    //console.log(index);


    translation.push(functionName);
      translation.push("(");
    insertFunction({
      'function' : func,
      'functionName' : functionName,
      'type' : 'functionTypeA',
      'paramStartIndex' : translation.length-1,
      'insertLength' : 2,
      'open' : true
    });
    return;
  }

  /*
  insertFunction : this function insert a function object into functionMapping
      functionMapping needs to be sorted based on paramStartIndex
      all elements's paramStartIndex also need to be updated whenever we call this function
    {
      'function' : func,
      'functionName' : functionName
      'type' : 'functionTypeA',
      'paramStartIndex' : translation.length-1,
      'insertLength' : 2,
      'open' : true
    }
  */

  function insertFunction(input) {
    var insertLength = input.insertLength;
    var f;
    //update all the paramStartIndex in functionMapping
    console.log("check point ^");

    for (var i=0; i<functionMapping.length; i++) {
      f = functionMapping[i];
      if (f.paramStartIndex >= input.paramStartIndex) {
         functionMapping[i].paramStartIndex += insertLength;
      }
    }
    functionMapping.push(input);
    console.log("after push ,functionMapping.length is " + functionMapping.length + " in functionmapping is " + functionMapping.join(""));
    functionMapping.sort(function(a, b){
      return b.paramStartIndex - a.paramStartIndex;
    })
  }

  //hit structure end
  //initialize variables
  var init = function(){
    buffer = [];
    translation = [];
    newUnit = true;
    firstUnit = true;
    functionMapping = [],
    paramStartIndex = 0;
  }


  /*******************************************************
      this function loops through  functionMapping array and closes up any function as needed
  *******************************************************/
  function closeFunctionCheck() {
    var f;
    // if there is no function, we don't go to the for loop below
       //console.log("length of functionmapping is " + functionMapping.length);
    for (var i=0; i<functionMapping.length; i++) {

      console.log("closefunctioncheck for loop is used");
      f = functionMapping[i];

      if (f.open) {
        //console.log('closeFunction: '+f.functionName+'  starting index: '+f.paramStartIndex);
        //console.log(JSON.stringify(translation));
        if (closeFunction(f.paramStartIndex)){
          functionMapping[i].open = false;
        }
      }
    }
  }
  function closeFunction(index) {
    var count = 0;
    if (index == translation.length-1) return false;
    for (var i=index; i<translation.length;i++) {
      var char = translation[i];
      //console.log('i: '+i + ' char: '+char);
      if (char == '(') {
        count++;
      }
      if (char == ')') {
        count -= 1;
      }
    }
    if (count == 0) {
      translation.push(')');
      return true;
    }
    return false;
  }





  /************************************
  addMissingOperators:
    javascripts interprets (expression)()  as function calls, - need to add * operators
  *****************************************/
  function addMissingOperators(str) {
    //this function should add missing operators *
    str = str.replace(')(',')*(');
    str = str.replace(')Math.',')*Math.');
    return str;
  }
  myMathlib.calculate = function() {
    //console.log("when I appear, it is in the calculation status");
    //console.log("before go in to translation function");
  //  console.log(translation.join(''));

    translateFunction();
    //console.log("after translation function");
    //console.log(translation.join(''));
    completeEquation();
    var translationText = translation.join('');
    translationText = addMissingOperators(translationText);
    console.log('translation: ' + translationText)
    var output = eval(translationText);
    init();
    console.log('output: ' + output);
    return output;
  }
  /*******************************************************
      this function loops through  functionMapping array and translates all the functionName to function
  *******************************************************/
  function translateFunction() {
    var f, index;
    console.log("before entering the while loop inside the translatefunction");
    console.log("translation function is " + translation);
    while (functionMapping.length > 0) {
      f = functionMapping.pop();
      console.log("we print out f");
      console.log(f);

      index = translation.indexOf(f.functionName)
      if (index > -1) {
        translation[index] = f.function;
      }
    }
  }

  /************************************
  completeEquation:
    count the '(' , ')'  pairs and complete the equation as needed
  *****************************************/
  function completeEquation() {
    var count = 0;
    for (var i=0;i<translation.length;i++) {
      var char = translation[i];
      if (char == '(') {
        count++;
      }
      if (char == ')') {
        count -= 1;
      }
    }
    while (count > 0) {
      translation.push(')');
      count -= 1;
    }
  }
  return myMathlib;
}))

/************************************
Test Cases:
  each array inside test simulates a sequence of user input
*****************************************/
var test = [
  //{
    //'type' : 'basic operation with +-*/ and ( )',
    //'testCases' : [
    //  ['(','4',')','(','3','+','4',')', '/', '2'],
     //['(','4',')','(','3','+','4'],  //test auto complete bracket
    //  ['(','4',')','3','+','4'],
    //  ['1','4','+','3','-','4'],
    //  ['1','4','+','3','*','4'],
    //  ['1','+','(','3'],
    //  ['(','2',')','(','2',')','+','1'],
    //  ['(','1','+','3',')','+','(','2', '+', '1',')']
  //  ],
    //'expectedResults' : [
    //  14,28,16,13,26,4,5,7
  //  ]
//  },
  {
    'type' : 'operation with ^',
    'testCases' : [
    //  ['(','3',')','(','1','+','1',')', '^', '(', '1', '+', '1',')', '+', '(', '1', '+', '2' ],
    //  ['1','+','(','1','+','1',')', '^', '(', '1', '+', '1', ')' , '+', '1'],
    //  ['(','1','+','1',')', '^', '(', '1', '+', '1' ],
    //  ['(','4',')','(','3','+','4',')', '^', '2'],
      ['1','+','3','^','2','+','3','^','4'],
    //  ['2','^','(', '2', '^', '2', '+', '1', ')'],
    //  ['2','^', '2', '^', '3'],
    //  ['2','^','(', '2', '^', '3', ')'],
    //  ['2','^','(', '2', '^', '2', '+', '1', ')', '^', '2'],
    //  ['2','^','(', '2', '^', '2', '+', '1', ')', '^', '(', '1' , '+', '1' , ')' , '+', '3'],
    // ['(', '2', '^', '2', '+', '1', ')', '^', '(', '1' , '+', '1' , ')' , '+', '3'],
    ],
    'expectedResults' : [
      15,6,4,196,10,32,64,256,1024,1027,28
    ]
  }
];
var failedTest = [];
var testResults = [];
test.forEach(function(t){
//  console.log('Testing for: '+t.type);
  var testResultObj = {
    type : t.type,
    results : []
  };
  var expectedResults = t.expectedResults;
  t.testCases.forEach(function(input,index,arr){
    input.forEach(function(c){
      myMathlib.hit(c);
    });
    //console.log('input: '+ input.join(''));
    var result = myMathlib.calculate();
    if (expectedResults[index] != result) {
      failedTest.push(input);
    }
    testResultObj.results.push(result);
  })
  testResults.push(testResultObj);
});
console.log(failedTest);
if (failedTest.length <= 0) {
  console.log('all testCases passed!');
} else {
  console.log('Failed TestCases: ');
  failedTest.forEach(function(testcase){
  console.log(testcase.join(''));
  });
}
