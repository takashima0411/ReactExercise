/** @jsx React.DOM */
var MainComponent = React.createClass({
	getInitialState : function(){
		return {
			filterText:'',
			champions : []
		};
	},
	handleUserIntput: function(filterText){
		this.setState({ filterText: filterText});
	},
	componentDidMount : function(){
		var _this = this;
		$.get('https://ddragon.leagueoflegends.com/cdn/5.2.1/data/en_US/champion.json',function(result){
			var data = $.map(result.data,function(champion,hoge){
				return hoge;
			});
			_this.setState({ champions : data });
		});
	},
	render : function() {
		var _this = this;
		var data = $.map(this.state.champions,function(champion,hoge){
			if( champion.toString().toLowerCase().search(_this.state.filterText.toLowerCase()) != -1 || _this.state.filterText === ""){
				return (<ChampionComponent name={champion} />);
			}
		});
		return (
			<div className="MainComponent container-fluid">
				<h1>Champions</h1>
				<FilterBar filterText={this.state.filterText} onUserInput={this.handleUserIntput}/>
				<div id="data">
					{data}
				</div>
			</div>
		);
	}
});

var ChampionComponent = React.createClass({
	render : function() {
		var championImg = `http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/${this.props.name}.png`
		return (
			<div className="champion panel panel-default col-xs-6 col-sm-4 col-md-3 col-lg-2">
				<div className="panel-body">
					<p>{this.props.name}</p>
					<img src={championImg} />
				</div>
			</div>
		)
	}
});

var FilterBar = React.createClass({
	handleChange : function(){
		this.props.onUserInput(
			this.refs.filterTextInput.getDOMNode().value
		)
	},
	render : function(){
		return(
			<form>
				<input type="text" placeholder="filter..." ref="filterTextInput" value={this.props.filterText} onChange={this.handleChange} />
			</form>
		);
	}
});

React.render(<MainComponent />, document.body);