<script>
	/**
	 * This is the skySharethis directive
	 * Usage:
	 * <button
	 * 		sky-sharethis="facebook"
	 * 		apikey="rtqsa3gsn5td9u6uvb43cvyh">
	 * 		share on facebook
	 * </button>
	 *
	 * The value of the attribute "sky-sharethis"
	 * is the sharing destination
	 * List of available destinations here:
	 * http://sharethis.com/publishers/services-directory
	 *
	 *
	 * The (optional) value of the attribute "apikey" is the
	 * users apikey for sharethis
	 * Sign up for apikey here:
	 * http://developer.sharethis.com/apps/register
	 *
	 *
	 * Tools:
	 * http://developer.sharethis.com/io-docs
	 */
export default {
	props: {
		media: {
			type: String,
			required: true,
		},
		status: {
			type: Number,
			default: 0,
		},
		toolbar: {
			type: Number,
			default: 0,
		},
		width: {
			type: Number,
			default: 500,
		},
		height: {
			type: Number,
			default: 400,
		},
		api: {
			type: String,
			default: 'rtqsa3gsn5td9u6uvb43cvyh',
		},
		shareUrl: {
			type: String,
			default: location.href,
		},
		title: {
			type: String,
			default: location.host,
		},
	},
	data() {
		return {};
	},
	computed: {
		destination() {
			return `http://rest.sharethis.com/v1/share/share
					?destination=${encodeURIComponent(this.media)}
					&url=${encodeURIComponent(this.shareUrl)}
					&api_key=${encodeURIComponent(this.api)}
					&title=${encodeURIComponent(this.title)}`;
		},
		setup() {
			return `status=${this.status},
					toolbar=${this.toolbar},
					width=${this.width},
					height=${this.height}`;
		},
	},
	methods: {
		share() {
			const isMail = this.media === 'email' || this.media === 'mail';

			if (isMail) {
				window.location.href = `mailto:?body=${this.shareUrl}`;
			} else {
				window.open(this.destination, '', this.setup);
			}
		},
	},
};
</script>

<template>
	<button
		class="sky-sharethis"
		@click.prevent="share">
		<slot />
	</button>
</template>
<style src="./sky-sharethis.scss"></style>
