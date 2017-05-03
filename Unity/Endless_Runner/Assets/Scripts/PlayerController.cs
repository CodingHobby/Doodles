using UnityEngine;

public class PlayerController : MonoBehaviour {

	public float moveSpeed;
	public float jumpForce;

	public float speedMultiplier;
	public float speedIncreaseMilestone;
	private float speedMilestoneCount;

	private float moveSpeedStore;
	private float speedMilestoneCountStore;
	private float speedIncreaseMilestoneStore;

	private Rigidbody2D rb;

	private bool onGround;

	public LayerMask ground;

	public Transform groundCheck;
	public float groundCheckR;

	private Animator thisAnimator;

	public float jumpTime;
	private float jumpTimeCounter;

	public GameManager gameManager;

	void Start () {
		rb = GetComponent<Rigidbody2D>();
		thisAnimator = GetComponent<Animator>();
		jumpTime = 0.25f;
		jumpTimeCounter = jumpTime;
		speedMilestoneCount = speedIncreaseMilestone;

		moveSpeedStore = moveSpeed;
		speedMilestoneCountStore = speedMilestoneCount;
		speedIncreaseMilestoneStore = speedIncreaseMilestone;
	}

	void Update () {

		onGround = Physics2D.OverlapCircle(groundCheck.position, groundCheckR, ground);

		if(transform.position.x > speedMilestoneCount) {
			speedMilestoneCount += speedIncreaseMilestone;

			speedIncreaseMilestone *= speedIncreaseMilestone * speedMultiplier;

			moveSpeed *= speedMultiplier;
		}

		rb.velocity = new Vector2(moveSpeed, rb.velocity.y);

		if((Input.GetKeyDown(KeyCode.W) || Input.GetMouseButtonDown(0)) && onGround) {
			rb.velocity = new Vector2(rb.velocity.x, jumpForce);
		}

		if(Input.GetKey(KeyCode.W) || Input.GetMouseButton(0)) {
			if (jumpTimeCounter > 0) {
				rb.velocity = new Vector2(rb.velocity.x, jumpForce);
				jumpTimeCounter -= Time.deltaTime;
			}
		}

		if(Input.GetKeyUp(KeyCode.W) || Input.GetMouseButtonUp(0)) {
			jumpTimeCounter = 0;
		}

		if(onGround) {
			jumpTimeCounter = jumpTime;
		}

		thisAnimator.SetFloat("Speed", rb.velocity.x);
		thisAnimator.SetBool("OnGround", onGround);

	}

	private void OnCollisionEnter2D(Collision2D other) {
		if(other.gameObject.tag == "Finish") {
			gameManager.RestartGame();
			moveSpeed = moveSpeedStore;
			speedMilestoneCount = speedMilestoneCountStore;
			speedIncreaseMilestone = speedIncreaseMilestoneStore;
		}
	}
}
