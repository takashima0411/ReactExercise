/** @jsx React.DOM */
var MainComponent = React.createClass({
	getInitialState : function(){
		return {
			filterText:'',
			sortCondition:'name',
			champions : []
		};
	},
	handleUserIntput: function(filterText){
		this.setState({ filterText: filterText});
	},
	handleSortCondition: function(sortCondition){
		this.setState({ sortCondition: sortCondition});
	},
	componentDidMount : function(){
		var _this = this;
		$.get('https://ddragon.leagueoflegends.com/cdn/5.2.1/data/en_US/champion.json',function(result){
			var data = $.map(result.data,function(champion,hoge){
				return champion;
			});
			_this.setState({ champions : data });
		});
	},
	render : function() {
		var _this = this;
		var champions = this.state.champions;
		var filtered = champions.filter(function(value,index){
			return value.name.toLowerCase().search(_this.state.filterText.toLowerCase()) != -1
		});
		if(this.state.sortCondition == "key"){
			filtered.sort(function(a,b){ return a.key - b.key});
		}
		if(this.state.sortCondition == "name"){
			filtered.sort(function(a,b){ return a.name - b.name})
		}
		var data = $.map(filtered,function(champion,hoge){
			return (<ChampionComponent champion={champion} />);
		});
		return (
			<div className="MainComponent container-fluid">
				<h1>Champions</h1>
				<SortCondition onUserSelect={this.handleSortCondition}/>
				<FilterInput filterText={this.state.filterText} onUserInput={this.handleUserIntput}/>
				<div id="data">
					{data}
				</div>
			</div>
		);
	}
});

var ChampionComponent = React.createClass({
	render : function() {
		var championImg = `http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/${this.props.champion.id}.png`
		return (
			<div className="champion panel panel-default col-xs-6 col-sm-4 col-md-3 col-lg-2">
				<div className="panel-body">
					<p>{this.props.champion.name}</p>
					<img src={championImg} />
				</div>
			</div>
		)
	}
});

var SortCondition = React.createClass({
	handleChange : function(){
		this.props.onUserSelect(
			this.refs.sortCondition.getDOMNode().value
		);
	},
	render : function(){
		return(
			<form>
				<div className="form-group">
					<label>sort by</label>
					<select name="sort-by" ref="sortCondition" onChange={this.handleChange}>
						<option label="sort-by-name" value="name">name</option>
						<option label="sort-by-key" value="key">key</option>
					</select>
				</div>
			</form>
		);
	}
});

var FilterInput = React.createClass({
	handleChange : function(){
		this.props.onUserInput(
			this.refs.filterTextInput.getDOMNode().value
		)
	},
	render : function(){
		return(
			<form>
				<div className="form-group">
					<label htmlFor="filter">filter</label>
					<input id="filter" className="form-control" type="text" placeholder="filter..." ref="filterTextInput" value={this.props.filterText} onChange={this.handleChange} />
				</div>
			</form>
		);
	}
});

React.render(<MainComponent />, document.body);