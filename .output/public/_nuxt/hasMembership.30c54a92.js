var o={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"user_individual_membership"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"user_organization_membership"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:87}};o.loc.source={body:`{
  user_individual_membership{
    id
  }
  user_organization_membership{
    id
  }
}`,name:"GraphQL request",locationOffset:{line:1,column:1}};function a(e,i){if(e.kind==="FragmentSpread")i.add(e.name.value);else if(e.kind==="VariableDefinition"){var n=e.type;n.kind==="NamedType"&&i.add(n.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(t){a(t,i)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(t){a(t,i)}),e.definitions&&e.definitions.forEach(function(t){a(t,i)})}var s={};(function(){o.definitions.forEach(function(i){if(i.name){var n=new Set;a(i,n),s[i.name.value]=n}})})();export{o as d};
