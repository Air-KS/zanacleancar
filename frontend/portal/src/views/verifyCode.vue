<!--
	./frontend/src/components/popup/verifyCode.vue
-->

<template>
  <div class="verify-container">
    <div class="form-wrapper">
      <h2 class="form-title">📨 Vérifie ton Email 📨</h2>
      <p>Un code a été envoyé à :</p>
      <p><span class="text-mail">{{ email }}</span></p>

      <div class="code-input-wrapper">
        <input v-for="(digit, index) in codeDigits" :key="index" v-model="codeDigits[index]" type="text" maxlength="1"
          class="digit-input" @input="handleInput($event, index)" @keydown.backspace="handleBackspace($event, index)"
          @paste="handlePaste($event)" ref="digitInputs" />
        <img src="@/assets/resend.svg" alt="Renvoyer le code" class="imageResend" @click="resendCode"
          :class="{ disabled: isResending }" />
      </div>

      <p v-if="errorMessage" class="text-red-600 mt-2">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-green-600 mt-2">{{ successMessage }}</p>

      <button class="forms-button mt-4" @click="verifyCode" :disabled="isResending">
        {{ isResending ? "Envoi..." : "Valider le Code" }}
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
    // focus après le dernier chiffre
    this.$nextTick(() => {
      this.$refs.digitInputs[5]?.focus();
    });
    event.preventDefault(); // Empêche le comportement par défaut
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
          err.response?.data?.error || "Une erreur est survenue, réessaie plus tard.";
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
          err.response?.data?.error || "Impossible de renvoyer le code pour le moment.";
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

.text-mail {
  font-weight: bold;
  color: #4b70e2;
}

.code-input-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
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

.imageResend {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: 0.2s;
  margin-left: 10px;
}

.imageResend.disabled {
  opacity: 0.5;
  pointer-events: none;
}


@media (max-width: 600px) {
  .verify-container {
    width: 90%;
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
}
</style>
