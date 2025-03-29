<!--
	./frontend/src/views/verifyCode.vue
-->

<template>
  <div class="verify-container fade-in-up">
    <div class="form-wrapper">
      <h2 class="form-title">📨 Vérifie ton Email 📨</h2>
      <p>Un code a été envoyé à :</p>
      <p><span class="text-mail">{{ email }}</span></p>

      <div class="code-input-wrapper">
        <div class="code-input-group">
          <input v-for="(digit, index) in codeDigits" :key="index" v-model="codeDigits[index]" type="text"
            inputmode="numeric" maxlength="1" class="digit-input" @input="handleInput($event, index)"
            @beforeinput="handleBeforeInput($event, index)" @keydown.backspace="handleBackspace($event, index)"
            @paste="handlePaste($event)" ref="digitInputs" />

          <!-- Icône de renvoi -->
          <div class="resend-icon-wrapper">
            <img title="Renvoyer le code" src="@/assets/resend.svg" alt="Renvoyer le code" class="imageResendAbsolute"
              @click="resendCode" :class="{ disabled: isResending || resendCooldown > 0 }" />
          </div>

          <!-- Timer -->
          <div v-if="resendCooldown > 0" class="cooldown-absolute">
            {{ resendCooldown }}
          </div>
        </div>
      </div>

      <p v-if="errorMessage" class="errorMessage" v-html="formattedErrorMessage"></p>
      <p v-if="successMessage" class="successMessage" v-html="formattedSuccessMessage"></p>

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
      resendCooldown: 0,
    };
  },
  computed: {
    formattedErrorMessage() {
      return this.errorMessage.replace(/\n/g, "<br>");
    },
    formattedSuccessMessage() {
      return this.successMessage.replace(/\n/g, "<br>");
    }
  },
  methods: {
    handleInput(event, index) {
      const value = event.target.value.replace(/\D/g, "");

      // Si plusieurs chiffres sont collés via @input (sur mobile)
      if (value.length > 1) {
        this.codeDigits = value.split("").slice(0, 6);
        this.$nextTick(() => {
          this.$refs.digitInputs[value.length - 1]?.focus();
        });
        return;
      }

      this.codeDigits[index] = value.charAt(0);
      if (value && index < 5) {
        this.$refs.digitInputs[index + 1].focus();
      }
    },
    handleBeforeInput(event, index) {
      const data = event.data || '';
      const pasted = data.replace(/\D/g, '');

      if (pasted.length > 1) {
        this.codeDigits = pasted.split("").slice(0, 6);
        this.$nextTick(() => {
          this.$refs.digitInputs[pasted.length - 1]?.focus();
        });
        event.preventDefault(); // stop le comportement normal
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
    startCooldown(seconds = 60) {
      this.resendCooldown = seconds;
      const interval = setInterval(() => {
        if (this.resendCooldown > 0) {
          this.resendCooldown--;
        } else {
          clearInterval(interval);
        }
      }, 1000);
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
          `${import.meta.env.VITE_API_URL}/api/v1/auth/verifyCode`,
          { email: this.email, code },
          { withCredentials: true }
        );
        if (res.status === 200) {
          this.successMessage = "Code vérifié avec succès.";
          this.$router.push("/dashboard");
        }
      } catch (err) {
        console.error("Erreur de vérification :", err);
        this.errorMessage = err.response?.data?.error || "Une erreur est survenue, réessaie plus tard.";
      }
    },
    async resendCode() {
      if (this.resendCooldown > 0) return;

      this.errorMessage = "";
      this.successMessage = "";
      this.isResending = true;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/auth/resend-code`,
          { email: this.email },
          { withCredentials: true }
        );
        if (res.status === 200) {
          this.successMessage = `Code renvoyé à : \n ${this.email}`;
          this.startCooldown(60);
        }
      } catch (err) {
        console.error("Erreur lors du renvoi :", err);
        this.errorMessage = err.response?.data?.error || "Impossible de renvoyer le code pour le moment.";
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
  transition: box-shadow 0.4s ease, border-color 0.4s ease;
}

.digit-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-focus);
}

/* Icône de renvoi */
.resend-icon-wrapper {
  position: absolute;
  top: 50%;
  right: -40px;
  transform: translateY(-50%);
}

.imageResendAbsolute {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: 0.2s;
}

.imageResendAbsolute.disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* Timer */
.cooldown-absolute {
  position: absolute;
  top: 50%;
  right: calc(-40px - 35px);
  transform: translateY(-50%);
  font-size: 20px;
  color: #888;
  animation: pulse 1.5s ease-in-out infinite;
}

/* Animation du timer */
@keyframes pulse {
  0% {
    opacity: 0.7;
    transform: translateY(-50%) scale(1);
  }

  50% {
    opacity: 1;
    transform: translateY(-50%) scale(1.1);
  }

  100% {
    opacity: 0.7;
    transform: translateY(-50%) scale(1);
  }
}

/* Responsive */
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

  .resend-icon-wrapper {
    top: 55%;
  }

  .imageResendAbsolute {
    width: 20px;
  }

  .cooldown-absolute {
    font-size: 16px;
    top: -10px;
    right: -40px
  }
}

@media (min-width: 601px) and (max-width: 1199px) {
  .verify-container {
    width: 80%;
  }

  .cooldown-absolute {
    top: 45%;
    right: -70px;
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

  .cooldown-absolute {
    top: 45%;
    right: -70px;
  }

}
</style>
