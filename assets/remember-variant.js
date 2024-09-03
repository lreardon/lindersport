	function updateRememberedVariant(variantId) {
		console.log(`[REMEMBER] ${variantId}`);
		sessionStorage.setItem('rememberedVariant', variantId);

		const rememberedVariantId = sessionStorage.getItem('rememberedVariant');
		console.log(`[TRACKING] ${rememberedVariantId}`);
	}