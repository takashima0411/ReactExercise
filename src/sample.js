/** @jsx React.DOM */
var MainComponent = React.createClass({
	getInitialState : function(){
		return {
			championNodes : []
		};
	},
	componentDidMount : function(){
		var _this = this;
		$.get('https://ddragon.leagueoflegends.com/cdn/5.2.1/data/en_US/champion.json',function(result){
			var data = $.map(result.data,function(champion,hoge){
				return (<ChampionComponent name={hoge} />);
			});
			_this.setState({ champions : data });
		});
	},
	render : function() {
		return (
			<div className="MainComponent container-fluid">
				<h1>Champions</h1>
				<div id="data">
					{this.state.champions}
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

React.render(<MainComponent />, document.body);