import { a as e, i as t, n, r, t as i } from "../shared/Card.js";
//#region src/components/BudgetChannelCard.tsx
var a = t(), o = e(), s = r();
function c(e) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(e);
}
function l({ channelId: e, name: t, budget: n, cpl: r, conversionRate: i, onBudgetChange: a, onCplChange: o, onConversionRateChange: l }) {
	let u = n / r, d = u * i;
	return /* @__PURE__ */ (0, s.jsxs)("li", {
		className: "budget-planner-channel-card",
		children: [
			/* @__PURE__ */ (0, s.jsx)("h3", { children: t }),
			/* @__PURE__ */ (0, s.jsxs)("div", {
				className: "budget-planner-field",
				children: [
					/* @__PURE__ */ (0, s.jsx)("label", {
						htmlFor: `${e}-budget`,
						children: "Monthly budget"
					}),
					/* @__PURE__ */ (0, s.jsx)("input", {
						id: `${e}-budget`,
						type: "range",
						min: 1e3,
						max: 5e4,
						step: 500,
						value: n,
						onChange: (e) => a(Number(e.target.value))
					}),
					/* @__PURE__ */ (0, s.jsx)("output", { children: c(n) })
				]
			}),
			/* @__PURE__ */ (0, s.jsxs)("div", {
				className: "budget-planner-field-grid",
				children: [/* @__PURE__ */ (0, s.jsxs)("div", { children: [/* @__PURE__ */ (0, s.jsx)("label", {
					htmlFor: `${e}-cpl`,
					children: "Cost per lead"
				}), /* @__PURE__ */ (0, s.jsx)("input", {
					id: `${e}-cpl`,
					type: "number",
					min: 10,
					step: 5,
					value: r,
					onChange: (e) => o(Number(e.target.value) || 0)
				})] }), /* @__PURE__ */ (0, s.jsxs)("div", { children: [/* @__PURE__ */ (0, s.jsx)("label", {
					htmlFor: `${e}-conversion`,
					children: "Lead-to-deal conversion %"
				}), /* @__PURE__ */ (0, s.jsx)("input", {
					id: `${e}-conversion`,
					type: "number",
					min: 1,
					max: 100,
					step: 1,
					value: Math.round(i * 100),
					onChange: (e) => l(Number(e.target.value) || 0)
				})] })]
			}),
			/* @__PURE__ */ (0, s.jsxs)("p", {
				className: "budget-planner-metrics",
				children: [
					Math.round(u),
					" leads/month, ",
					d.toFixed(1),
					" deals/month"
				]
			})
		]
	});
}
//#endregion
//#region src/blocks/budget-planner/BudgetPlanner.tsx
function u(e) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(e);
}
function d(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function f(e, t) {
	let n = e.reduce((e, t) => e + t.budget, 0), r = e.reduce((e, t) => e + t.budget / t.cpl, 0), i = e.reduce((e, t) => e + t.budget / t.cpl * t.conversionRate, 0), a = i * t;
	return {
		totalBudget: n,
		totalLeads: r,
		totalDeals: i,
		projectedRevenue: a,
		projectedRoi: n === 0 ? 0 : (a - n) / n * 100
	};
}
function p({ title: e = "Budget Planner", description: t = "Adjust channel spend and assumptions to forecast leads, pipeline, and ROI in real time.", initialChannels: r, averageDealValue: a }) {
	let [c, p] = (0, o.useState)(r), [m, h] = (0, o.useState)(a), g = (0, o.useMemo)(() => f(c, m), [c, m]), _ = (e, t) => {
		p((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	};
	return /* @__PURE__ */ (0, s.jsxs)("section", {
		className: "budget-planner-r",
		"aria-label": "Marketing budget planner",
		children: [
			/* @__PURE__ */ (0, s.jsx)(n, {
				title: e,
				description: t,
				className: "budget-planner-header"
			}),
			/* @__PURE__ */ (0, s.jsxs)("div", {
				className: "budget-planner-deal-value",
				children: [/* @__PURE__ */ (0, s.jsx)("label", {
					htmlFor: "deal-value",
					children: "Average deal value"
				}), /* @__PURE__ */ (0, s.jsx)("input", {
					id: "deal-value",
					type: "number",
					min: 1e3,
					step: 500,
					value: m,
					onChange: (e) => h(d(Number(e.target.value) || 0, 1e3, 1e5))
				})]
			}),
			/* @__PURE__ */ (0, s.jsx)("ul", {
				className: "budget-planner-channels",
				children: c.map((e) => /* @__PURE__ */ (0, s.jsx)(l, {
					channelId: e.id,
					name: e.name,
					budget: e.budget,
					cpl: e.cpl,
					conversionRate: e.conversionRate,
					onBudgetChange: (t) => _(e.id, { budget: t }),
					onCplChange: (t) => _(e.id, { cpl: d(t, 10, 1e3) }),
					onConversionRateChange: (t) => _(e.id, { conversionRate: d(t, 1, 100) / 100 })
				}, e.id))
			}),
			/* @__PURE__ */ (0, s.jsxs)("section", {
				className: "budget-planner-summary",
				"aria-label": "Budget planner summary metrics",
				children: [
					/* @__PURE__ */ (0, s.jsx)(i, {
						title: "Total budget",
						value: u(g.totalBudget)
					}),
					/* @__PURE__ */ (0, s.jsx)(i, {
						title: "Projected leads",
						value: Math.round(g.totalLeads).toLocaleString()
					}),
					/* @__PURE__ */ (0, s.jsx)(i, {
						title: "Projected revenue",
						value: u(g.projectedRevenue)
					}),
					/* @__PURE__ */ (0, s.jsx)(i, {
						title: "Projected ROI",
						value: `${g.projectedRoi.toFixed(1)}%`,
						tone: g.projectedRoi >= 0 ? "positive" : "negative"
					})
				]
			})
		]
	});
}
//#endregion
//#region src/blocks/budget-planner/index.tsx
var m = /* @__PURE__ */ new WeakMap(), h = [
	{
		id: "paid-search",
		name: "Paid Search",
		budget: 14e3,
		cpl: 120,
		conversionRate: .12
	},
	{
		id: "linkedin-ads",
		name: "LinkedIn Ads",
		budget: 1e4,
		cpl: 165,
		conversionRate: .1
	},
	{
		id: "webinars",
		name: "Webinars",
		budget: 7e3,
		cpl: 95,
		conversionRate: .16
	}
];
function g(e, t = {}) {
	let n = m.get(e) ?? (0, a.createRoot)(e);
	m.has(e) || m.set(e, n), n.render(/* @__PURE__ */ (0, s.jsx)(p, {
		title: t.title ?? "Budget Planner",
		description: t.description ?? "Adjust channel spend and assumptions to forecast leads, pipeline, and ROI in real time.",
		averageDealValue: t.averageDealValue ?? 18e3,
		initialChannels: t.initialChannels ?? h
	}));
}
function _(e) {
	let t = m.get(e);
	t && (t.unmount(), m.delete(e));
}
//#endregion
export { g as mount, _ as unmount };

//# sourceMappingURL=budget-planner.js.map