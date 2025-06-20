# Angular 19 Signals Store Architecture – Tutorial for Account & Statements Page

This tutorial provides a two-page summary for designing and implementing a **Signal-based state management architecture** in Angular 19. It is based on a real-world scenario similar to Citi’s Account Statements page with multiple account types, flag-based UI, and ICMS integration.

---

## 1. Layered Architecture Overview

### Core Layers

1. **API Service (`StatementsApiService`)**

   * Makes HTTP calls to retrieve accounts and statements.
   * No state logic.

2. **StatementsStore**

   * Main state manager using `signal()` and `computed()`.
   * Holds shared state: accounts, flags, selected account/year, etc.
   * Injected by child stores or components.

3. **Child Stores (optional)**

   * Specialized logic (e.g. download permissions, UI toggles).
   * Use `computed()` on parent store signals.

4. **Container Component (`StatementsPageComponent`)**

   * Top-level route component.
   * Fetches API data and populates `StatementsStore`.
   * Hosts presentational UI components.

5. **Presentational Components**

   * Display data via `@Input()` or inject `StatementsStore` directly if feature-specific.

---

## 2. StatementsStore Structure

### File: `statements.store.ts`

```ts
@Injectable({ providedIn: 'root' })
export class StatementsStore {
  private allAccounts = signal<Account[]>([]);
  private selectedAccountId = signal<string | null>(null);
  private selectedYear = signal<number>(new Date().getFullYear());
  private statementsByYear = signal<StatementsByYear[]>([]);
  private archiveEligible = signal(false);
  private archiveStartDate = signal<string | null>(null);
  private msFlags = signal<string[]>([]);

  readonly accounts$ = this.allAccounts.asReadonly();
  readonly selectedAccountId$ = this.selectedAccountId.asReadonly();
  readonly selectedYear$ = this.selectedYear.asReadonly();

  readonly selectedAccount = computed(() =>
    this.allAccounts().find(acc => acc.accountId === this.selectedAccountId()) ?? null
  );

  readonly cardAccounts = computed(() =>
    this.allAccounts().filter(acc => acc.accountType === 'CARDS')
  );

  readonly statementsForSelectedYear = computed(() =>
    this.statementsByYear().find(y => y.displayYearTitle === this.selectedYear().toString()) ?? null
  );

  readonly monthlyStatements = computed(() =>
    this.statementsForSelectedYear()?.statementsByMonth ?? []
  );

  readonly annualSummaryLabel = computed(() =>
    this.statementsForSelectedYear()?.annualAccountSummaryUrlDetails?.documentUrlLabel ?? ''
  );

  readonly showAnnualSummary = computed(() =>
    this.statementsForSelectedYear()?.annualAccountSummaryEligibleFlag ?? false
  );

  readonly showArchivedMessage = computed(() =>
    this.archiveEligible() && !!this.archiveStartDate()
  );

  readonly archiveStartDateFormatted = computed(() => {
    const raw = this.archiveStartDate();
    return raw ? new Date(raw).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
  });

  setAccountsResponse(data: EligibleAccountsResponse) {
    const all: Account[] = [
      ...data.cardAccounts.map(a => ({ ...a, accountType: 'CARDS' })),
      ...data.bankAccounts.map(a => ({ ...a, accountType: 'BANK' })),
      ...data.loanAccounts.map(a => ({ ...a, accountType: 'LOAN' }))
    ];
    this.allAccounts.set(all);
    if (all.length && !this.selectedAccountId()) {
      this.selectedAccountId.set(all[0].accountId);
    }
  }

  setStatements(response: StatementsApiResponse) {
    this.statementsByYear.set(response.statementsByYear);
    this.archiveEligible.set(response.archivedStatementsEligibleFlag);
    this.archiveStartDate.set(response.accountOpenDate);
  }

  setSelectedAccountId(id: string) {
    this.selectedAccountId.set(id);
  }

  setSelectedYear(year: number) {
    this.selectedYear.set(year);
  }

  setMsFlags(flags: string[]) {
    this.msFlags.set(flags);
  }
}
```

---

## 3. Displaying Conditional Archived Content

When `archivedStatementsEligibleFlag = true` and `accountOpenDate` exists, show:

```html
<p>
  {{ cms.description() }}
  <ng-container *ngIf="store.showArchivedMessage()">
    {{ cms.archivedMessagePrefix() }} {{ store.archiveStartDateFormatted() }},
    <a [href]="cms.archivedLinkUrl()">{{ cms.archivedLinkLabel() }}</a>.
  </ng-container>
</p>
```

---

## 4. Cross-Store Access with computed()

If `DownloadStore` needs to compute something based on `StatementsStore`:

```ts
@Injectable({ providedIn: 'root' })
export class DownloadStore {
  constructor(private statementsStore: StatementsStore) {}

  readonly isDownloadAllowed = computed(() =>
    !!this.statementsStore.selectedAccountId$() &&
    !this.statementsStore.msFlags().includes('restricted')
  );
}
```

Keep `StatementsStore` the **owner of shared signals**, and inject it into any child store for derived logic.

---

## 5. Summary Guidelines

* Keep shared state and API-driven signals in `StatementsStore`
* Use `computed()` extensively for derived values
* Use `@Input()` for reusable UI components; inject `StatementsStore` in feature-specific ones
* Inject parent store into child stores (never the reverse)
* Flatten account types early if showing a unified account picker

This architecture scales cleanly across complex enterprise-grade Angular apps while remaining reactive and testable.
Excellent point — in the HTTP + signal example we discussed, `effect()` wasn't used. That's because:

> `effect()` is useful **when you want to react to signal changes** with **side effects**, not just for storing fetched data.

---

## 6. When to Use `effect()` with Signals:

Here are practical use cases for `effect()` in the context of `HttpClient + signals`:

### **Auto-fetch on some signal change**

```ts
filter = signal('all');

constructor(private http: HttpClient) {
  effect(() => {
    const value = filter();
    this.http.get(`/api/items?type=${value}`).subscribe(res => {
      this.dataSignal.set(res);
    });
  });
}
```
- `effect()` reacts when `filter()` changes and triggers the request.
---
### **Log or track analytics**

```ts
effect(() => {
  const d = this.dataSignal();
  if (d.length > 0) {
    console.log('Data loaded:', d.length);
    // send analytics, trigger notification, etc.
  }
});
```
### **Trigger a follow-up action**

```ts
effect(() => {
  if (this.user().role === 'admin') {
    this.fetchAdminData();
  }
});
```
### **Enable "Submit" button when form is valid**
```ts
import { signal, computed, effect } from '@angular/core';

export class LoginForm {
  email = signal('');
  password = signal('');
  canSubmit = signal(false);

  constructor() {
    effect(() => {
      const isEmailValid = this.email().includes('@');
      const isPasswordValid = this.password().length >= 6;

      this.canSubmit.set(isEmailValid && isPasswordValid);
    });
  }

  submit() {
    if (this.canSubmit()) {
      console.log('Form submitted:', this.email(), this.password());
    }
  }
}
```
```html
<input type="text" (input)="email.set($event.target.value)" />
<input type="password" (input)="password.set($event.target.value)" />
<button [disabled]="!canSubmit()">Submit</button>
```
## Recommendation

* Use `computed()` for **deriving data only**
* Use `effect()` only for **side effects**, not logic
* Use `effect()` for DOM changes that Angular templates can't handle easily.
* Angular's signal engine automatically tracks dependencies and only recomputes when inputs actually change.
* Break complex computed() into smaller, named ones. Instead of:

```ts
statusMessage = computed(() => {
  const status = this.service.status();
  const user = this.auth.user();
  return `User ${user.name} is ${status}`;
});
```

Split for clarity:

```ts
userName = computed(() => this.auth.user().name);
status = computed(() => this.service.status());
statusMessage = computed(() => `User ${this.userName()} is ${this.status()}`);
```
