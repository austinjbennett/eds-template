import { a as e, i as t, n, r, t as i } from "../shared/Card.js";
//#region src/blocks/lead-funnel/lead-funnel.css
var a = t(), o = e(), s = r();
function c(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function l(e) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(e);
}
function u(e) {
	return `${(e * 100).toFixed(1)}%`;
}
function d(e, t, n, r, i, a, o) {
	let s = e * t * o, c = s * n, l = c * r, u = l * i;
	return {
		leads: s,
		mqls: c,
		sqls: l,
		deals: u,
		revenue: u * a
	};
}
function f({ title: e = "Lead Funnel Simulator", description: t = "Model conversion rates and compare optimization scenarios in real time.", monthlyTraffic: r, visitorToLeadRate: a, leadToMqlRate: f, mqlToSqlRate: p, sqlToDealRate: m, averageDealValue: h, salesCycleDays: g, showScenarioComparison: _, optimizationLiftPercent: v }) {
	let [y, b] = (0, o.useState)("month"), [x, S] = (0, o.useState)(r), [C, w] = (0, o.useState)(a), [T, E] = (0, o.useState)(f), [D, O] = (0, o.useState)(p), [k, A] = (0, o.useState)(m), [j, M] = (0, o.useState)(h), [N, P] = (0, o.useState)(v), [F, I] = (0, o.useState)(_), L = y === "month" ? 1 : 3, R = (0, o.useMemo)(() => d(x, C, T, D, k, j, L), [
		x,
		C,
		T,
		D,
		k,
		j,
		L
	]), z = (0, o.useMemo)(() => {
		if (!F) return null;
		let e = 1 + N / 100, t = d(x, c(C * e, 0, 1), c(T * e, 0, 1), c(D * e, 0, 1), c(k * e, 0, 1), j, L);
		return {
			lifted: t,
			dealDelta: t.deals - R.deals,
			revenueDelta: t.revenue - R.revenue
		};
	}, [
		F,
		N,
		x,
		C,
		T,
		D,
		k,
		j,
		L,
		R
	]);
	return /* @__PURE__ */ (0, s.jsxs)("section", {
		className: "lead-funnel-r",
		"aria-label": "Lead funnel simulator",
		children: [
			/* @__PURE__ */ (0, s.jsx)(n, {
				title: e,
				description: t,
				className: "lead-funnel-header"
			}),
			/* @__PURE__ */ (0, s.jsxs)("div", {
				className: "lead-funnel-toolbar",
				children: [/* @__PURE__ */ (0, s.jsx)("button", {
					type: "button",
					className: y === "month" ? "is-active" : "",
					onClick: () => b("month"),
					children: "Monthly"
				}), /* @__PURE__ */ (0, s.jsx)("button", {
					type: "button",
					className: y === "quarter" ? "is-active" : "",
					onClick: () => b("quarter"),
					children: "Quarterly"
				})]
			}),
			/* @__PURE__ */ (0, s.jsxs)("div", {
				className: "lead-funnel-grid",
				children: [
					/* @__PURE__ */ (0, s.jsxs)("label", {
						className: "lead-funnel-field",
						children: ["Monthly traffic", /* @__PURE__ */ (0, s.jsx)("input", {
							type: "number",
							min: 1e3,
							step: 1e3,
							value: x,
							onChange: (e) => S(c(Number(e.target.value) || 0, 1e3, 5e6))
						})]
					}),
					/* @__PURE__ */ (0, s.jsxs)("label", {
						className: "lead-funnel-field",
						children: [
							"Visitor to lead",
							/* @__PURE__ */ (0, s.jsx)("input", {
								type: "range",
								min: .1,
								max: 20,
								step: .1,
								value: C * 100,
								onChange: (e) => w(c(Number(e.target.value) || 0, .1, 20) / 100)
							}),
							/* @__PURE__ */ (0, s.jsx)("span", {
								className: "lead-funnel-field-value",
								children: u(C)
							})
						]
					}),
					/* @__PURE__ */ (0, s.jsxs)("label", {
						className: "lead-funnel-field",
						children: [
							"Lead to MQL",
							/* @__PURE__ */ (0, s.jsx)("input", {
								type: "range",
								min: 1,
								max: 100,
								step: 1,
								value: T * 100,
								onChange: (e) => E(c(Number(e.target.value) || 0, 1, 100) / 100)
							}),
							/* @__PURE__ */ (0, s.jsx)("span", {
								className: "lead-funnel-field-value",
								children: u(T)
							})
						]
					}),
					/* @__PURE__ */ (0, s.jsxs)("label", {
						className: "lead-funnel-field",
						children: [
							"MQL to SQL",
							/* @__PURE__ */ (0, s.jsx)("input", {
								type: "range",
								min: 1,
								max: 100,
								step: 1,
								value: D * 100,
								onChange: (e) => O(c(Number(e.target.value) || 0, 1, 100) / 100)
							}),
							/* @__PURE__ */ (0, s.jsx)("span", {
								className: "lead-funnel-field-value",
								children: u(D)
							})
						]
					}),
					/* @__PURE__ */ (0, s.jsxs)("label", {
						className: "lead-funnel-field",
						children: [
							"SQL to deal",
							/* @__PURE__ */ (0, s.jsx)("input", {
								type: "range",
								min: 1,
								max: 100,
								step: 1,
								value: k * 100,
								onChange: (e) => A(c(Number(e.target.value) || 0, 1, 100) / 100)
							}),
							/* @__PURE__ */ (0, s.jsx)("span", {
								className: "lead-funnel-field-value",
								children: u(k)
							})
						]
					}),
					/* @__PURE__ */ (0, s.jsxs)("label", {
						className: "lead-funnel-field",
						children: ["Average deal value", /* @__PURE__ */ (0, s.jsx)("input", {
							type: "number",
							min: 1e3,
							step: 500,
							value: j,
							onChange: (e) => M(c(Number(e.target.value) || 0, 1e3, 1e6))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, s.jsxs)("section", {
				className: "lead-funnel-summary",
				"aria-label": "Lead funnel summary metrics",
				children: [
					/* @__PURE__ */ (0, s.jsx)(i, {
						title: "Leads",
						value: Math.round(R.leads).toLocaleString()
					}),
					/* @__PURE__ */ (0, s.jsx)(i, {
						title: "MQLs",
						value: Math.round(R.mqls).toLocaleString()
					}),
					/* @__PURE__ */ (0, s.jsx)(i, {
						title: "SQLs",
						value: Math.round(R.sqls).toLocaleString()
					}),
					/* @__PURE__ */ (0, s.jsx)(i, {
						title: "Deals",
						value: R.deals.toFixed(1)
					}),
					/* @__PURE__ */ (0, s.jsx)(i, {
						title: `Revenue (${y})`,
						value: l(R.revenue)
					}),
					/* @__PURE__ */ (0, s.jsx)(i, {
						title: "Sales cycle",
						value: `${Math.round(g)} days`
					})
				]
			}),
			/* @__PURE__ */ (0, s.jsxs)("div", {
				className: "lead-funnel-field",
				style: { marginTop: "16px" },
				children: [/* @__PURE__ */ (0, s.jsxs)("label", { children: [
					/* @__PURE__ */ (0, s.jsx)("input", {
						type: "checkbox",
						checked: F,
						onChange: (e) => I(e.target.checked)
					}),
					" ",
					"Show optimization scenario"
				] }), /* @__PURE__ */ (0, s.jsxs)("label", { children: [
					"Lift percent",
					/* @__PURE__ */ (0, s.jsx)("input", {
						type: "range",
						min: 0,
						max: 100,
						step: 1,
						value: N,
						onChange: (e) => P(c(Number(e.target.value) || 0, 0, 100))
					}),
					/* @__PURE__ */ (0, s.jsxs)("span", {
						className: "lead-funnel-field-value",
						children: [N, "%"]
					})
				] })]
			}),
			z && /* @__PURE__ */ (0, s.jsxs)("section", {
				className: "lead-funnel-comparison",
				"aria-label": "Optimization scenario",
				children: [
					/* @__PURE__ */ (0, s.jsx)("h3", { children: "Optimization scenario" }),
					/* @__PURE__ */ (0, s.jsxs)("p", { children: [
						"Deals: ",
						z.lifted.deals.toFixed(1),
						" ",
						/* @__PURE__ */ (0, s.jsxs)("span", {
							className: "lead-funnel-delta",
							children: [
								"(+",
								z.dealDelta.toFixed(1),
								")"
							]
						})
					] }),
					/* @__PURE__ */ (0, s.jsxs)("p", { children: [
						"Revenue: ",
						l(z.lifted.revenue),
						" ",
						/* @__PURE__ */ (0, s.jsxs)("span", {
							className: "lead-funnel-delta",
							children: [
								"(+",
								l(z.revenueDelta),
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
var p = /* @__PURE__ */ new WeakMap();
function m(e, t = {}) {
	let n = p.get(e) ?? (0, a.createRoot)(e);
	p.has(e) || p.set(e, n), n.render(/* @__PURE__ */ (0, s.jsx)(f, {
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
function h(e) {
	let t = p.get(e);
	t && (t.unmount(), p.delete(e));
}
//#endregion
export { m as mount, h as unmount };

//# sourceMappingURL=lead-funnel.js.map