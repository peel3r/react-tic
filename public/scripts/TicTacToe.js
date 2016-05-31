
var fields = [[0,0,0],
              [0,0,0],
              [0,0,0]];

function checkMove(rowNum, colNum, info) {

  if(info !== "") {
    fields = [[0,0,0],
              [0,0,0],
              [0,0,0]];
    return {fields: fields, info: ""};
  }

  var blankFields = [];
  var score = [0,0,0,0];
  if(fields[rowNum][colNum] === 0) {
    fields[rowNum][colNum] = 1;
    for(var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if(fields[i][j] === 0) blankFields.push([i,j]);
      }
      score[0] += fields[rowNum][i];
      score[1] += fields[i][colNum];
      if(rowNum === colNum) score[2] += fields[i][i];
      if(rowNum + colNum  === 2) score[3] += fields[i][2-i];
    }
    if(score.indexOf(3) !== -1) {
      return {fields: fields, info: "You Won"};
    }
  } else {
    return {fields: fields, info: ""};
  }
  if(blankFields.length>0){
    var randomIndex = Math.floor(Math.random() * blankFields.length);
    var chosenRow = parseInt(blankFields[randomIndex][0]);
    var chosenCol = blankFields[randomIndex][1];
    fields[chosenRow][chosenCol] = -1;
    score = [0,0,0,0];
    for(var i = 0; i < 3; i++) {
      score[0] += fields[chosenRow][i];
      score[1] += fields[i][chosenCol];
      if(chosenRow === chosenCol) score[2] += fields[i][i];
      if(chosenRow + chosenCol  === 2) score[3] += fields[i][2-i];
    }
    if(score.indexOf(-3) !== -1) {
      return {fields: fields, info: "You Lost"};
    }
  } else {
    info = "Game Over";
  }
  return {fields: fields, info: info};
}


var Board = React.createClass({
  getInitialState: function(){
    return {fields: this.props.fields, info: ''};
  },
  onFieldClicked: function(e) {
    var rowNum = +e.target.id[0];
    var colNum = +e.target.id[1];
    var retVal = checkMove(rowNum, colNum, this.state.info);
    this.setState({fields: retVal.fields, info: retVal.info});
  },
  render: function(){
      var fields = [];
      this.state.fields.forEach(function(row, i){
          var rowNum = i;
          row.forEach(function(val, i){
            var colNum = i;
            var id = rowNum.toString() + colNum.toString();
            if(val === 0) val = "";
            else if(val == 1) val = "x";
            else val = "o";
            fields.push(<Field key={id} id={id} onClick={this.onFieldClicked}>{val}</Field>);
          }.bind(this));
      }.bind(this));
    return (
      <div className="board">
        {fields}
        <Info>{this.state.info}</Info>
      </div>
    );
  }
});

var Field = React.createClass({
  render: function(){
    return (
      <div className="field"
        role="button"
        id = {this.props.id}
        onClick = {this.props.onClick} >
      {this.props.children}
    </div>
  )
  }
});

var Info = React.createClass({
  render: function(){
    return(
      <div className="info">{this.props.children}</div>
    );
  }
});

ReactDOM.render(
  <Board fields={fields} />,
  document.getElementById('content')
)
