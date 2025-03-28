<!--
	./frontend/src/components/popup/verifyCode.vue
-->

<template>
  <div class="verify-container fade-in-up">
    <div class="form-wrapper">
      <h2 class="form-title">📨 Vérifie ton Email 📨</h2>
      <p>Un code a été envoyé à :</p>
      <p><span class="text-mail">{{ email }}</span></p>

      <div class="code-input-wrapper">
        <div class="code-input-group">
          <input
            v-for="(digit, index) in codeDigits"
            :key="index"
            v-model="codeDigits[index]"
            type="text"
            maxlength="1"
            class="digit-input"
            @input="handleInput($event, index)"
            @keydown.backspace="handleBackspace($event, index)"
            @paste="handlePaste($event)"
            ref="digitInputs"
          />
          <img
            src="@/assets/resend.svg"
            alt="Renvoyer le code"
            class="imageResendAbsolute"
            @click="resendCode"
            :class="{ disabled: isResending }"
          />
        </div>
      </div>

      <p v-if="errorMessage" class="errorMessage">{{ errorMessage }}</p>
      <p v-if="successMessage" class="successMessage">{{ successMessage }}</p>

      <button class="forms-button" @click="verifyCode" :disabled="isResending">
        {{ isResending ? "Un instant..." : "Valider le Code" }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "VerifyCode",
  data() {
    return {
      email: this.$route.query.email || "",
      codeDigits: ["", "", "", "", "", ""],
      errorMessage: "",
      successMessage: "",
      isResending: false,
    };
  },
  methods: {
    handleInput(event, index) {
      const value = event.target.value.replace(/\D/g, "").charAt(0);
      this.codeDigits[index] = value;
      if (value && index < 5) {
        this.$refs.digitInputs[index + 1].focus();
      }
    },
    handleBackspace(event, index) {
      if (!this.codeDigits[index] && index > 0) {
        this.$refs.digitInputs[index - 1].focus();
      }
    },
    handlePaste(event) {
      const paste = event.clipboardData.getData("text").replace(/\D/g, "");
      if (paste.length === 6) {
        this.codeDigits = paste.split("").slice(0, 6);
        this.$nextTick(() => {
          this.$refs.digitInputs[5]?.focus();
        });
        event.preventDefault();
      }
    },
    async verifyCode() {
      this.errorMessage = "";
      this.successMessage = "";
      const code = this.codeDigits.join("");

      if (code.length !== 6) {
        this.errorMessage = "Le code doit contenir 6 chiffres.";
        return;
      }

      try {
        const res = await axios.post(
          `http://localhost:3000/api/v1/auth/verifyCode`,
          {
            email: this.email,
            code: code,
          },
          { withCredentials: true }
        );

        if (res.status === 200) {
          this.successMessage = "Code vérifié avec succès.";
          this.$router.push("/dashboard");
        }
      } catch (err) {
        console.error("Erreur de vérification :", err);
        this.errorMessage =
          err.response?.data?.error ||
          "Une erreur est survenue, réessaie plus tard.";
      }
    },
    async resendCode() {
      this.errorMessage = "";
      this.successMessage = "";
      this.isResending = true;

      try {
        const res = await axios.post(
          `http://localhost:3000/api/v1/auth/resend-code`,
          { email: this.email },
          { withCredentials: true }
        );
        if (res.status === 200) {
          this.successMessage = `Code renvoyé à ${this.email}`;
        }
      } catch (err) {
        console.error("Erreur lors du renvoi :", err);
        this.errorMessage =
          err.response?.data?.error ||
          "Impossible de renvoyer le code pour le moment.";
      } finally {
        this.isResending = false;
      }
    },
  },
};
</script>

<style scoped>
.verify-container {
  margin: 0 auto;
  width: 100%;
}

.form-title {
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}

.text-mail {
  font-weight: bold;
  color: #4b70e2;
}

.code-input-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.code-input-group {
  position: relative;
  display: flex;
  gap: 10px;
}

.digit-input {
  width: 40px;
  height: 50px;
  text-align: center;
  font-size: 22px;
  border: 1px solid #ccc;
  border-radius: 8px;
  color: #4b70e2;
  font-weight: bold;
}

.imageResendAbsolute {
  position: absolute;
  right: -35px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: 0.2s;
}

.imageResendAbsolute.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.successMessage {
  color: rgb(17, 168, 17);
  padding-bottom: 20px;
}

.errorMessage {
  color: rgb(247, 42, 42);
  padding-bottom: 20px;
}

@media (max-width: 600px) {
  .verify-container {
    width: 90%;
  }

  .form-title {
    font-size: 20px;
  }

  .digit-input {
    width: 30px;
    height: 40px;
    font-size: 22px;
  }
}

@media (min-width: 601px) and (max-width: 1199px) {
  .verify-container {
    width: 70%;
  }
}

@media (min-width: 1200px) {
  .verify-container {
    width: 50%;
  }

  .digit-input {
    width: 50px;
    height: 60px;
    font-size: 2rem;
  }

  p {
    font-size: 1.3rem;
  }

  .form-title {
    font-size: 2.5rem;
  }
}
</style>
