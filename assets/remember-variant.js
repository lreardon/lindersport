	function updateRememberedVariant(variantId) {
		console.log(`[REMEMBER] ${variantId}`);
		localStorage.setItem('rememberedVariant', variantId);

		const rememberedVariantId = localStorage.getItem('rememberedVariant');
		console.log(`[TRACKING] ${rememberedVariantId}`);
	}