# AI Tokens, Tokenization, and Text Generation

Beginner-friendly notes on how an AI language model processes text and generates responses.

## 1. What Is a Token?

A token is a piece of text that a language model processes as a numerical representation.

Tokens can represent:
- Complete words
- Parts of words
- Punctuation
- Other text patterns

Example (simplified):

```text
unbelievable → un + believ + able
```

Each token has an associated numerical ID.

The model processes these IDs rather than directly processing words as humans understand them.

---

## 2. Who Decides Token Boundaries?

The tokenizer and its vocabulary are designed during model development.

The tokenizer:
1. Uses a predefined vocabulary.
2. Splits input text into token chunks.
3. Converts each chunk into a token ID.

Example:

```text
Text:      Hello, how are you?
Tokens:    Hello | , | how | are | you | ?
Token IDs: 15496 | ... | ... | ... | ... | ...
```

The token boundaries and IDs above are illustrative.

The GPU does not decide token boundaries. Tokenization happens before the model processes the input.

The tokenizer is generally fixed for a particular model.

---
# GPT Tokenization – Notes

### 1. Vocabulary
- A vocabulary is like a dictionary that maps tokens to unique integer IDs.
- It contains words, word parts, punctuation, and spaces combined with words.
- Token IDs are identifiers, not meanings.

### 2. Tokenizer
- Converts text into tokens using a vocabulary.
- GPT commonly uses BPE (Byte Pair Encoding) or related methods.
- Frequent text patterns can become single tokens; uncommon words may split into smaller tokens.

### 3. Tokenization Example
```text
Text: Hello, how are you?

Tokens: Hello | , | how | are | you | ?
Token IDs: 15496 | 11 | 703 | 527 | 345 | 30
```
*Example IDs are illustrative.*

### 4. How GPT Uses Tokens
```text
Text
 ↓
Tokenizer
 ↓
Token IDs
 ↓
Embedding vectors
 ↓
Neural network
 ↓
Predict next token
```

### Key Concepts
- **Vocabulary:** Dictionary of tokens and their IDs.
- **Tokenizer:** Converts text into tokens and IDs.
- **Embedding:** Converts token IDs into numerical vectors.
- **Model:** Learns relationships between tokens and predicts the next token.
## 3. Do Tokens Have to Be Complete Words?

No.

A tokenizer can represent text using complete words, subwords, or other text chunks.

For example:

```text
unbelievable
```

Possible tokenizations:

```text
un + believable
```

or:

```text
un + believ + able
```

or:

```text
unbelievable
```

These are illustrative possibilities. The actual result depends on the tokenizer.

### Why use subwords?

Subwords allow the model to process unfamiliar or rare words using smaller pieces.

For example, if a word is not in the vocabulary as a complete token, the tokenizer may represent it using several existing tokens.

This provides flexibility without requiring every possible word to have its own token ID.

---

## 4. Do Smaller Tokens Improve Accuracy?

Not automatically.

Tokenization balances several factors:

| Factor | Explanation |
|---|---|
| Vocabulary size | How many different tokens are available |
| Sequence length | How many tokens represent the input |
| Flexibility | How well the tokenizer handles unfamiliar words |
| Efficiency | How much computation is required |

### Smaller tokens

Advantages:
- More flexibility for unfamiliar words
- Reuse of subword components

Tradeoffs:
- More tokens may be needed for the same text
- Longer sequences can require more computation

### Larger tokens

Advantages:
- Common words can be represented efficiently
- Shorter token sequences

Tradeoffs:
- Less flexibility if rare words are not represented directly

**Key point:** Smaller tokens do not automatically improve accuracy.

Accuracy depends on tokenizer design, training data, model architecture, and training quality.

The tokenizer and model are trained and designed to work together.

---

## 5. What Is the AI Model Function `f(x)`?

We can conceptually represent the model as a function:

`f(x; θ)`

Where:

- `f` = the AI model
- `x` = the input context represented as tokens
- `θ` = the model's learned parameters

The model calculates scores for possible next tokens.

Conceptually:

`f(x; θ) → logits`

Logits are numerical scores for the possible next tokens.

These scores can be converted into probabilities.

`P(next token | x)`

The model therefore estimates which tokens are likely to follow the current context.

**Important distinction**

The model does not necessarily select the next token itself.

The model calculates scores or probabilities. A decoding or selection strategy (greedy, top-k, top-p, temperature sampling) chooses the token to generate.

The model therefore estimates which tokens are likely to follow the current context.

### Important distinction

The model does not necessarily select the next token itself.

The model calculates scores or probabilities.

A decoding or selection strategy chooses the token to generate.

---

## 6. Example: Model Predicting the Next Token

Input:

```text
User: What is the capital of France?
```

The input is tokenized:

```python
x = tokenize("What is the capital of France?")
```

The model processes the token IDs:

```python
logits = f(x)
```

The logits can be converted into probabilities.

Illustrative probabilities:

| Token | Probability |
|---|---:|
| Paris | 70% |
| London | 10% |
| The | 8% |
| Other tokens | 12% |

These probabilities are made up for explanation.

The model calculates the probability distribution based on the input context and its learned parameters.

---

## 7. Who Selects the Next Token?

A decoding strategy selects the next token from the model's output.

Two common strategies are:

### Greedy decoding

Always selects the highest-probability token.

Example:

```text
Paris: 70%
London: 10%
The: 8%
```

Greedy decoding selects:

```text
Paris
```

### Sampling

Selects a token randomly, weighted by its probability.

The same example could produce:

```text
Paris
```

or:

```text
London
```

or:

```text
The
```

A lower-probability token can be selected.

Sampling does not mean every token has an equal chance.

The probabilities influence the selection.

### Why can sampling produce different answers?

Sampling uses randomness.

Even if the probability distribution is the same at a particular step, different random draws can select different tokens.

After a token is selected, the context changes.

The model then calculates a new probability distribution for the updated context.

Therefore, the next probabilities may change as generation continues.

---

## 8. Temperature and Sampling

Temperature influences how sharply or smoothly token probabilities are distributed during sampling.

Conceptually:

- Lower temperature makes the distribution more concentrated around higher-scoring tokens.
- Higher temperature makes the distribution flatter, giving lower-scoring tokens more opportunity to be selected.

Temperature does not change the tokenizer.

It affects the decoding process.

The model's underlying learned parameters remain fixed during ordinary inference.

---

## 9. What Does the GPU Do?

The GPU performs the mathematical calculations inside the model.

The model contains learned numerical parameters.

During inference, the GPU performs operations such as:

- Matrix multiplication
- Attention calculations
- Neural network layer operations

These calculations process the numerical token representations and produce model output scores.

### Overall flow

```text
Text
  ↓
Tokenizer
  ↓
Token IDs
  ↓
Model calculations on GPU
  ↓
Logits
  ↓
Probabilities
  ↓
Token selector
  ↓
Selected token
```

The GPU performs the model's calculations.

The selector chooses which token to generate.

---

## 10. Autoregressive Generation

Language models generate text autoregressively.

This means the model generates one token at a time, using the previous context.

Conceptually:

`f(x1) → P(x2)`

`f(x1, x2) → P(x3)`

`f(x1, x2, x3) → P(x4)`

Each step predicts the next token based on the tokens already available.

### Python-style pseudocode

```python
context = input_tokens

while not finished:

    logits = model(context)

    probabilities = convert_to_probabilities(logits)

    next_token = selector(probabilities)

    context.append(next_token)
```

This is simplified pseudocode.

Real inference systems use optimized implementations and may cache previous calculations instead of recomputing everything from scratch.

### Example

Starting context:

```text
The capital of France is
```

The model calculates probabilities.

The selector chooses:

```text
Paris
```

The context becomes:

```text
The capital of France is Paris
```

The model processes the updated context and predicts the next token.

The process repeats until the model reaches an end token or another stopping condition.

---

## 11. How the Concepts Connect

```text
User input
    ↓
Tokenizer
    ↓
Token IDs
    ↓
Context x
    ↓
Model f(x; θ)
    ↓
Logits
    ↓
Probability distribution
    ↓
Selector
    ↓
Next token
    ↓
Append token to context
    ↓
Call model again
```

### Responsibilities

| Component | Responsibility |
|---|---|
| Tokenizer | Converts text into token IDs |
| Vocabulary | Defines available token representations |
| Model | Calculates scores for possible next tokens |
| GPU | Performs model calculations |
| Probability conversion | Converts logits into probabilities |
| Selector | Chooses the next token |
| Generation loop | Repeats until completion |

---

## 12. Important Clarifications

### The model does not simply return a word

The model calculates logits or scores for possible next tokens.

A decoding strategy selects a token from those outputs.

### Tokenization is not performed by the GPU

The tokenizer determines how text is split into token IDs.

The GPU processes the model's numerical calculations.

### Smaller tokens do not guarantee better precision

Token size is one design tradeoff.

Model quality and training are important factors in accuracy.

### The model uses context

The next-token prediction depends on the available context, including previous tokens.

### The process is autoregressive

Generated tokens become part of the context used for subsequent predictions.

---

## 13. Final Mental Model

Think of the AI as a prediction function:

`f(x; θ) → next-token scores`

Where:

- `x` is the current token context.
- `θ` represents learned parameters.
- The GPU performs the model calculations.
- The model produces scores for possible next tokens.
- The selector chooses a token.
- The selected token is appended to the context.
- The process repeats.

**The model predicts. The selector chooses. The generation loop repeats.**

That is the core idea behind autoregressive language generation.
