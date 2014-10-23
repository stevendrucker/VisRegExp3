var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DatasetConfiguration = (function () {
    function DatasetConfiguration(DataLoader, DataLoaderFile, DataLoaderEnumParameters, MaxEventsPerSession, MaxSessions, ParametersToExclude, DataLoaderTimeStampFormat) {
        this.DataLoader = DataLoader;
        this.DataLoaderFile = DataLoaderFile;
        this.DataLoaderEnumParameters = DataLoaderEnumParameters;
        this.MaxEventsPerSession = MaxEventsPerSession;
        this.MaxSessions = MaxSessions;
        this.ParametersToExclude = ParametersToExclude;
        this.DataLoaderTimeStampFormat = DataLoaderTimeStampFormat;
        this.$type = 'QueryWebApi.Models.DatasetConfiguration, QueryWebApi';
    }
    return DatasetConfiguration;
})();

var Log = (function () {
    function Log(ID, DatasetConfiguration, Events, Properties, Sessions, Users) {
        this.ID = ID;
        this.DatasetConfiguration = DatasetConfiguration;
        this.Events = Events;
        this.Properties = Properties;
        this.Sessions = Sessions;
        this.Users = Users;
        this.$type = 'QueryWebApi.Controllers.Log, QueryWebApi';
    }
    return Log;
})();

var LogEvent = (function () {
    function LogEvent(Ticks, Properties, TimeStamp, Id, StringId) {
        this.Ticks = Ticks;
        this.Properties = Properties;
        this.TimeStamp = TimeStamp;
        this.Id = Id;
        this.StringId = StringId;
        this.$type = 'QueryWebApi.Models.LogEvent, QueryWebApi';
    }
    return LogEvent;
})();

var LogProperty = (function () {
    function LogProperty(Name, VisualizationType) {
        this.Name = Name;
        this.VisualizationType = VisualizationType;
        this.$type = 'QueryWebApi.Models.LogProperty, QueryWebApi';
    }
    return LogProperty;
})();

var VisualizationType;
(function (VisualizationType) {
    VisualizationType[VisualizationType["Enum"] = 0] = "Enum";
    VisualizationType[VisualizationType["Continuous"] = 1] = "Continuous";
    VisualizationType[VisualizationType["None"] = 2] = "None";
})(VisualizationType || (VisualizationType = {}));

var LogPropertyValue = (function () {
    function LogPropertyValue(TextValue, AccociatedLogProperties, AccociatedLogPropertyValues) {
        this.TextValue = TextValue;
        this.AccociatedLogProperties = AccociatedLogProperties;
        this.AccociatedLogPropertyValues = AccociatedLogPropertyValues;
        this.$type = 'QueryWebApi.Models.LogPropertyValue, QueryWebApi';
    }
    return LogPropertyValue;
})();

var LogSession = (function () {
    function LogSession(LogEventsDictionary, Id, User) {
        this.LogEventsDictionary = LogEventsDictionary;
        this.Id = Id;
        this.User = User;
        this.$type = 'QueryWebApi.Models.LogSession, QueryWebApi';
    }
    return LogSession;
})();

var User = (function () {
    function User(State, Id) {
        this.State = State;
        this.Id = Id;
        this.$type = 'QueryWebApi.Models.User, QueryWebApi';
    }
    return User;
})();

var QueryExpression = (function () {
    function QueryExpression() {
        this.$type = 'QueryWebApi.Models.QueryExpression, QueryWebApi';
    }
    return QueryExpression;
})();

var LogQuery = (function () {
    function LogQuery(LogID, Expression) {
        this.LogID = LogID;
        this.Expression = Expression;
        this.$type = 'QueryWebApi.Models.LogQuery, QueryWebApi';
    }
    return LogQuery;
})();

var QueryMatch = (function () {
    function QueryMatch(Events, DurationTicks) {
        this.Events = Events;
        this.DurationTicks = DurationTicks;
        this.$type = 'QueryWebApi.Controllers.QueryMatch, QueryWebApi';
    }
    return QueryMatch;
})();

var EventExpression = (function (_super) {
    __extends(EventExpression, _super);
    function EventExpression(ID, IsMostLeftAtomViewModel, Quantifier, IsInverted, PropertyQueries) {
        _super.call(this);
        this.ID = ID;
        this.IsMostLeftAtomViewModel = IsMostLeftAtomViewModel;
        this.Quantifier = Quantifier;
        this.IsInverted = IsInverted;
        this.PropertyQueries = PropertyQueries;
        this.$type = 'QueryWebApi.Models.EventExpression, QueryWebApi';
    }
    return EventExpression;
})(QueryExpression);

var Quantifier;
(function (Quantifier) {
    Quantifier[Quantifier["Star"] = 0] = "Star";
    Quantifier[Quantifier["None"] = 1] = "None";
    Quantifier[Quantifier["Plus"] = 2] = "Plus";
    Quantifier[Quantifier["Question"] = 3] = "Question";
    Quantifier[Quantifier["One"] = 4] = "One";
})(Quantifier || (Quantifier = {}));

var PropertyQuery = (function () {
    function PropertyQuery(LogProperty, PropertyValue, HasReferences, IsExact, IsGroup, IsSelected, Query, SubPropertyQueries) {
        this.LogProperty = LogProperty;
        this.PropertyValue = PropertyValue;
        this.HasReferences = HasReferences;
        this.IsExact = IsExact;
        this.IsGroup = IsGroup;
        this.IsSelected = IsSelected;
        this.Query = Query;
        this.SubPropertyQueries = SubPropertyQueries;
        this.$type = 'QueryWebApi.Models.PropertyQuery, QueryWebApi';
    }
    return PropertyQuery;
})();

var LinkExpression = (function (_super) {
    __extends(LinkExpression, _super);
    function LinkExpression(ID, Quantifier) {
        _super.call(this);
        this.ID = ID;
        this.Quantifier = Quantifier;
        this.$type = 'QueryWebApi.Models.LinkExpression, QueryWebApi';
    }
    return LinkExpression;
})(QueryExpression);

var CompositeExpression = (function (_super) {
    __extends(CompositeExpression, _super);
    function CompositeExpression(Operator, Left, Right) {
        _super.call(this);
        this.Operator = Operator;
        this.Left = Left;
        this.Right = Right;
        this.$type = 'QueryWebApi.Models.CompositeExpression, QueryWebApi';
    }
    return CompositeExpression;
})(QueryExpression);

var ExpressionOperator;
(function (ExpressionOperator) {
    ExpressionOperator[ExpressionOperator["Concat"] = 0] = "Concat";
    ExpressionOperator[ExpressionOperator["Or"] = 1] = "Or";
    ExpressionOperator[ExpressionOperator["Star"] = 2] = "Star";
    ExpressionOperator[ExpressionOperator["Plus"] = 3] = "Plus";
    ExpressionOperator[ExpressionOperator["Question"] = 4] = "Question";
})(ExpressionOperator || (ExpressionOperator = {}));

var QueryWebApi = (function () {
    function QueryWebApi(prefix) {
        this.prefix = prefix;
    }
    QueryWebApi.prototype.safe = function (x) {
        return encodeURIComponent(x);
    };

    QueryWebApi.prototype.postLog = function (datasetConfig, successFunction, failureFunction) {
        $.ajax({ type: 'POST', url: this.prefix + '/api/log', async: true, data: JSON.stringify(datasetConfig), contentType: 'application/json', dataType: 'json', success: successFunction, error: failureFunction });
    };

    QueryWebApi.prototype.getLog = function (id, successFunction, failureFunction) {
        $.ajax({ type: 'GET', url: this.prefix + '/api/log', async: true, data: JSON.stringify(id), contentType: 'application/json', dataType: 'json', success: successFunction, error: failureFunction });
    };

    QueryWebApi.prototype.getQuery = function (jobId, successFunction, failureFunction) {
        $.ajax({ type: 'GET', url: this.prefix + '/api/query', async: true, data: JSON.stringify(jobId), contentType: 'application/json', dataType: 'json', success: successFunction, error: failureFunction });
    };

    QueryWebApi.prototype.postQuery = function (query, successFunction, failureFunction) {
        $.ajax({ type: 'POST', url: this.prefix + '/api/query', async: true, data: JSON.stringify(query), contentType: 'application/json', dataType: 'json', success: successFunction, error: failureFunction });
    };

    QueryWebApi.prototype.deleteQuery = function (queryId, successFunction, failureFunction) {
        $.ajax({ type: 'DELETE', url: this.prefix + '/api/query', async: true, data: JSON.stringify(queryId), contentType: 'application/json', success: successFunction, error: failureFunction });
    };

    QueryWebApi.prototype.getQueryMatches = function (logId, expressionId, successFunction, failureFunction) {
        $.ajax({ type: 'GET', url: this.prefix + '/api/result/' + this.safe(logId) + '/' + this.safe(expressionId) + '/matches', async: true, dataType: 'json', success: successFunction, error: failureFunction });
    };

    QueryWebApi.prototype.getResultCount = function (logId, expressionId, successFunction, failureFunction) {
        $.ajax({ type: 'GET', url: this.prefix + '/api/result/' + this.safe(logId) + '/' + this.safe(expressionId) + '/count', async: true, dataType: 'json', success: successFunction, error: failureFunction });
    };

    QueryWebApi.prototype.getPropertyHistogram = function (logId, expressionId, successFunction, failureFunction) {
        $.ajax({ type: 'GET', url: this.prefix + '/api/result/' + this.safe(logId) + '/' + this.safe(expressionId) + '/histogram', async: true, dataType: 'json', success: successFunction, error: failureFunction });
    };
    return QueryWebApi;
})();
//# sourceMappingURL=QueryService.js.map
