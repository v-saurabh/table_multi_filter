sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/demo/walkthrough/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {

		formatter: formatter,
		onInit: function () {
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		},
		onFilterInvoices: function (oEvent) {
			var sQuery = oEvent.getParameter("query");

			var aFilter1 = new Filter("ProductName", FilterOperator.Contains, sQuery);
			var aFilter2 = new Filter("Quantity", FilterOperator.EQ, sQuery);

			if (sQuery) {
				var allFilters = new Filter([aFilter1, aFilter2], false);
			}

			// filter binding
			var oList = this.byId("invoiceList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(allFilters);
		}
	});
});