import { n as e, r as t, t as n } from "../_shared/jsx-runtime-CFYM6stx.js";
//#region src/blocks/lead-funnel/LeadFunnel.tsx
var r = e(), i = t(), a = n();
function o(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function s(e) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(e);
}
function c(e) {
	return `${(e * 100).toFixed(1)}%`;
}
function l(e, t, n, r, i, a, o) {
	let s = e * t * o, c = s * n, l = c * r, u = l * i;
	return {
		leads: s,
		mqls: c,
		sqls: l,
		deals: u,
		revenue: u * a
	};
}
function u({ title: e = "Lead Funnel Simulator", description: t = "Model conversion rates and compare optimization scenarios in real time.", monthlyTraffic: n, visitorToLeadRate: r, leadToMqlRate: u, mqlToSqlRate: d, sqlToDealRate: f, averageDealValue: p, salesCycleDays: m, showScenarioComparison: h, optimizationLiftPercent: g }) {
	let [_, v] = (0, i.useState)("month"), [y, b] = (0, i.useState)(n), [x, S] = (0, i.useState)(r), [C, w] = (0, i.useState)(u), [T, E] = (0, i.useState)(d), [D, O] = (0, i.useState)(f), [k, A] = (0, i.useState)(p), [j, M] = (0, i.useState)(g), [N, P] = (0, i.useState)(h), F = _ === "month" ? 1 : 3, I = (0, i.useMemo)(() => l(y, x, C, T, D, k, F), [
		y,
		x,
		C,
		T,
		D,
		k,
		F
	]), L = (0, i.useMemo)(() => {
		if (!N) return null;
		let e = 1 + j / 100, t = l(y, o(x * e, 0, 1), o(C * e, 0, 1), o(T * e, 0, 1), o(D * e, 0, 1), k, F);
		return {
			lifted: t,
			dealDelta: t.deals - I.deals,
			revenueDelta: t.revenue - I.revenue
		};
	}, [
		N,
		j,
		y,
		x,
		C,
		T,
		D,
		k,
		F,
		I
	]);
	return /* @__PURE__ */ (0, a.jsxs)("section", {
		className: "lead-funnel-r",
		"aria-label": "Lead funnel simulator",
		children: [
			/* @__PURE__ */ (0, a.jsxs)("header", {
				className: "lead-funnel-header",
				children: [/* @__PURE__ */ (0, a.jsx)("h2", { children: e }), /* @__PURE__ */ (0, a.jsx)("p", { children: t })]
			}),
			/* @__PURE__ */ (0, a.jsxs)("div", {
				className: "lead-funnel-toolbar",
				children: [/* @__PURE__ */ (0, a.jsx)("button", {
					type: "button",
					className: _ === "month" ? "is-active" : "",
					onClick: () => v("month"),
					children: "Monthly"
				}), /* @__PURE__ */ (0, a.jsx)("button", {
					type: "button",
					className: _ === "quarter" ? "is-active" : "",
					onClick: () => v("quarter"),
					children: "Quarterly"
				})]
			}),
			/* @__PURE__ */ (0, a.jsxs)("div", {
				className: "lead-funnel-grid",
				children: [
					/* @__PURE__ */ (0, a.jsxs)("label", {
						className: "lead-funnel-field",
						children: ["Monthly traffic", /* @__PURE__ */ (0, a.jsx)("input", {
							type: "number",
							min: 1e3,
							step: 1e3,
							value: y,
							onChange: (e) => b(o(Number(e.target.value) || 0, 1e3, 5e6))
						})]
					}),
					/* @__PURE__ */ (0, a.jsxs)("label", {
						className: "lead-funnel-field",
						children: [
							"Visitor to lead",
							/* @__PURE__ */ (0, a.jsx)("input", {
								type: "range",
								min: .1,
								max: 20,
								step: .1,
								value: x * 100,
								onChange: (e) => S(o(Number(e.target.value) || 0, .1, 20) / 100)
							}),
							/* @__PURE__ */ (0, a.jsx)("span", {
								className: "lead-funnel-field-value",
								children: c(x)
							})
						]
					}),
					/* @__PURE__ */ (0, a.jsxs)("label", {
						className: "lead-funnel-field",
						children: [
							"Lead to MQL",
							/* @__PURE__ */ (0, a.jsx)("input", {
								type: "range",
								min: 1,
								max: 100,
								step: 1,
								value: C * 100,
								onChange: (e) => w(o(Number(e.target.value) || 0, 1, 100) / 100)
							}),
							/* @__PURE__ */ (0, a.jsx)("span", {
								className: "lead-funnel-field-value",
								children: c(C)
							})
						]
					}),
					/* @__PURE__ */ (0, a.jsxs)("label", {
						className: "lead-funnel-field",
						children: [
							"MQL to SQL",
							/* @__PURE__ */ (0, a.jsx)("input", {
								type: "range",
								min: 1,
								max: 100,
								step: 1,
								value: T * 100,
								onChange: (e) => E(o(Number(e.target.value) || 0, 1, 100) / 100)
							}),
							/* @__PURE__ */ (0, a.jsx)("span", {
								className: "lead-funnel-field-value",
								children: c(T)
							})
						]
					}),
					/* @__PURE__ */ (0, a.jsxs)("label", {
						className: "lead-funnel-field",
						children: [
							"SQL to deal",
							/* @__PURE__ */ (0, a.jsx)("input", {
								type: "range",
								min: 1,
								max: 100,
								step: 1,
								value: D * 100,
								onChange: (e) => O(o(Number(e.target.value) || 0, 1, 100) / 100)
							}),
							/* @__PURE__ */ (0, a.jsx)("span", {
								className: "lead-funnel-field-value",
								children: c(D)
							})
						]
					}),
					/* @__PURE__ */ (0, a.jsxs)("label", {
						className: "lead-funnel-field",
						children: ["Average deal value", /* @__PURE__ */ (0, a.jsx)("input", {
							type: "number",
							min: 1e3,
							step: 500,
							value: k,
							onChange: (e) => A(o(Number(e.target.value) || 0, 1e3, 1e6))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, a.jsxs)("dl", {
				className: "lead-funnel-summary",
				children: [
					/* @__PURE__ */ (0, a.jsxs)("div", {
						className: "lead-funnel-summary-card",
						children: [/* @__PURE__ */ (0, a.jsx)("dt", { children: "Leads" }), /* @__PURE__ */ (0, a.jsx)("dd", { children: Math.round(I.leads).toLocaleString() })]
					}),
					/* @__PURE__ */ (0, a.jsxs)("div", {
						className: "lead-funnel-summary-card",
						children: [/* @__PURE__ */ (0, a.jsx)("dt", { children: "MQLs" }), /* @__PURE__ */ (0, a.jsx)("dd", { children: Math.round(I.mqls).toLocaleString() })]
					}),
					/* @__PURE__ */ (0, a.jsxs)("div", {
						className: "lead-funnel-summary-card",
						children: [/* @__PURE__ */ (0, a.jsx)("dt", { children: "SQLs" }), /* @__PURE__ */ (0, a.jsx)("dd", { children: Math.round(I.sqls).toLocaleString() })]
					}),
					/* @__PURE__ */ (0, a.jsxs)("div", {
						className: "lead-funnel-summary-card",
						children: [/* @__PURE__ */ (0, a.jsx)("dt", { children: "Deals" }), /* @__PURE__ */ (0, a.jsx)("dd", { children: I.deals.toFixed(1) })]
					}),
					/* @__PURE__ */ (0, a.jsxs)("div", {
						className: "lead-funnel-summary-card",
						children: [/* @__PURE__ */ (0, a.jsxs)("dt", { children: [
							"Revenue (",
							_,
							")"
						] }), /* @__PURE__ */ (0, a.jsx)("dd", { children: s(I.revenue) })]
					}),
					/* @__PURE__ */ (0, a.jsxs)("div", {
						className: "lead-funnel-summary-card",
						children: [/* @__PURE__ */ (0, a.jsx)("dt", { children: "Sales cycle" }), /* @__PURE__ */ (0, a.jsxs)("dd", { children: [Math.round(m), " days"] })]
					})
				]
			}),
			/* @__PURE__ */ (0, a.jsxs)("div", {
				className: "lead-funnel-field",
				style: { marginTop: "16px" },
				children: [/* @__PURE__ */ (0, a.jsxs)("label", { children: [
					/* @__PURE__ */ (0, a.jsx)("input", {
						type: "checkbox",
						checked: N,
						onChange: (e) => P(e.target.checked)
					}),
					" ",
					"Show optimization scenario"
				] }), /* @__PURE__ */ (0, a.jsxs)("label", { children: [
					"Lift percent",
					/* @__PURE__ */ (0, a.jsx)("input", {
						type: "range",
						min: 0,
						max: 100,
						step: 1,
						value: j,
						onChange: (e) => M(o(Number(e.target.value) || 0, 0, 100))
					}),
					/* @__PURE__ */ (0, a.jsxs)("span", {
						className: "lead-funnel-field-value",
						children: [j, "%"]
					})
				] })]
			}),
			L && /* @__PURE__ */ (0, a.jsxs)("section", {
				className: "lead-funnel-comparison",
				"aria-label": "Optimization scenario",
				children: [
					/* @__PURE__ */ (0, a.jsx)("h3", { children: "Optimization scenario" }),
					/* @__PURE__ */ (0, a.jsxs)("p", { children: [
						"Deals: ",
						L.lifted.deals.toFixed(1),
						" ",
						/* @__PURE__ */ (0, a.jsxs)("span", {
							className: "lead-funnel-delta",
							children: [
								"(+",
								L.dealDelta.toFixed(1),
								")"
							]
						})
					] }),
					/* @__PURE__ */ (0, a.jsxs)("p", { children: [
						"Revenue: ",
						s(L.lifted.revenue),
						" ",
						/* @__PURE__ */ (0, a.jsxs)("span", {
							className: "lead-funnel-delta",
							children: [
								"(+",
								s(L.revenueDelta),
								")"
							]
						})
					] })
				]
			})
		]
	});
}
//#endregion
//#region src/blocks/lead-funnel/index.tsx
var d = /* @__PURE__ */ new WeakMap();
function f(e, t = {}) {
	let n = d.get(e) ?? (0, r.createRoot)(e);
	d.has(e) || d.set(e, n), n.render(/* @__PURE__ */ (0, a.jsx)(u, {
		title: t.title ?? "Lead Funnel Simulator",
		description: t.description ?? "Model conversion rates and compare optimization scenarios in real time.",
		monthlyTraffic: t.monthlyTraffic ?? 5e4,
		visitorToLeadRate: t.visitorToLeadRate ?? .028,
		leadToMqlRate: t.leadToMqlRate ?? .38,
		mqlToSqlRate: t.mqlToSqlRate ?? .45,
		sqlToDealRate: t.sqlToDealRate ?? .22,
		averageDealValue: t.averageDealValue ?? 18e3,
		salesCycleDays: t.salesCycleDays ?? 45,
		showScenarioComparison: t.showScenarioComparison ?? !0,
		optimizationLiftPercent: t.optimizationLiftPercent ?? 20
	}));
}
function p(e) {
	let t = d.get(e);
	t && (t.unmount(), d.delete(e));
}
//#endregion
export { f as mount, p as unmount };

//# sourceMappingURL=lead-funnel.js.map